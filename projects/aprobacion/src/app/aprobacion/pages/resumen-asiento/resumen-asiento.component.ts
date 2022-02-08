import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { FiltroAsiento, FiltroAsientoLimit } from '../../models/filtro-asiento.model';
import { AccountLine, LimitHeader } from '../../models/limite.model';
import { LimitHeaderService } from '../../services/limitHeader.service';
import { LimitService } from '../../services/limit.service';
import { Asiento } from '../../../shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-resumen-asiento',
  templateUrl: './resumen-asiento.component.html',
  styleUrls: ['./resumen-asiento.component.scss']
})
export class ResumenAsientoComponent extends UnsubcribeOnDestroy implements OnInit {
  id: number = 0;
  asiento?: Asiento;
  spinner: boolean;
  queryParams: any;
  idNumber = 0;
  cuenta: string;
  listFilter: Asiento[];
  accountInfo: AccountLine[] = [];
  filtrosData: FiltroAsiento = {
    inicio: '',
    fin: '',
    origen: '',
    usuario: '',
    estado: '',
    cuenta: '',
  };
  nombreUsuario: string;
  eventSuccess = false;
  eventNumber = 11;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lineHeaderService: LimitHeaderService,
    private limitService: LimitService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    super();
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });
    this.authService.getUsuarioV2().subscribe(rpta => this.nombreUsuario = rpta || '');
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getListData(this.filtrosData);
  }

  getListData(filtros: FiltroAsiento): void {
    this.spinner = true;
    const $subas = this.lineHeaderService
      .getLimitsHeader(filtros)
      .pipe(finalize(() => this.getListAaccount()))
      .subscribe(
        (asiento: LimitHeader[]) => {
          this.listFilter = (asiento || []).map((item) => ({
            id: item?.Id,
            origen: item?.Origen,
            fechaCarga: item?.Carga,
            usuario: item?.Usuario,
            comprobante: item?.Comprobante,
            fechaContable: item?.Contable,
            descripcion: item?.Descripcion,
            cargos: Number(item?.Cargo),
            abonos: Number(item?.Abono),
            cuentas: item.Cuenta,
          }))
          const subSelect = this.listFilter.find(p => p.id === this.id);
          this.cuenta = subSelect?.cuentas || '';
        }
      );
    this.arrayToDestroy.push($subas);
  }

  getListAaccount(): void {
    this.spinner = true;
    const $subas = this.limitService
      .getAccountLine(this.id, this.cuenta, this.eventNumber)
      .pipe(finalize(() => this.setData()))
      .subscribe(
        (asiento: AccountLine[]) => {
          this.accountInfo = asiento;
        }
      );
    this.arrayToDestroy.push($subas);
  }

  setData(): void {
    this.asiento = this.listFilter.find(p => p.id === this.id);
    this.spinner = false;
  }

  aprobar(): void {
    const request: FiltroAsientoLimit = {
      Usuario: this.nombreUsuario,
      Status: 1,
      Id: this.asiento?.id || 0,
    }
    this.spinner = true;
    const $subas = this.lineHeaderService
      .saveStatusAsient(request)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any) => {
          if (response?.status === appConstants.responseStatus.OK) {
            this.toastr.success(response?.message, 'Aprobado');
            this.getListData(this.filtrosData);
          }
        }
      );
    this.arrayToDestroy.push($subas);
  }

  rechazar(): void {
    const request: FiltroAsientoLimit = {
      Usuario: this.nombreUsuario,
      Status: 2,
      Id: this.asiento?.id || 0,
    }
    this.spinner = true;
    const $subas = this.lineHeaderService
      .saveStatusAsient(request)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any) => {
          if (response?.status === appConstants.responseStatus.OK) {
            this.toastr.success(response?.message, 'Rechazado');
            this.getListData(this.filtrosData);
          }
        }
      );
    this.arrayToDestroy.push($subas);
  }

  volver(): void {
    this.router.navigate(['/aprobacion/asientos-pendientes'],
    {
      queryParams: this.queryParams,
      skipLocationChange: false,
      queryParamsHandling: 'merge',
    })
  }

  event(): void {
    this.eventSuccess = !this.eventSuccess;
    this.eventNumber = this.eventSuccess  ? 7 : 11;
    this.getListAaccount();
  }
}
