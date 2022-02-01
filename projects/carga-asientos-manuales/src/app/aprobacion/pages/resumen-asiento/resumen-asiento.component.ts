import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { FiltroAsiento } from '../../models/filtro-asiento.model';
import { AccountLine, LimitHeader } from '../../models/limite.model';
import { LimitHeaderService } from '../../services/limitHeader.service';
import { LimitService } from '../../services/limit.service';
import { Asiento } from '../../../shared';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lineHeaderService: LimitHeaderService,
    private limitService: LimitService,
  ) {
    super();
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });
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
      .getAccountLine(this.id, this.cuenta)
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
  }

  rechazar(): void {
  }

  volver(): void {
    this.router.navigate(['/aprobacion/asientos-pendientes'],
    {
      queryParams: this.queryParams,
      skipLocationChange: false,
      queryParamsHandling: 'merge',
    })
  }
}
