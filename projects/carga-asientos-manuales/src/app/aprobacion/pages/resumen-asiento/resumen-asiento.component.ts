import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Asiento } from 'src/app/shared';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { FiltroAsiento } from '../../models/filtro-asiento.model';
import { LimitHeader } from '../../models/limite.model';
import { AsientosService } from '../../services/asientos.service';
import { LimitHeaderService } from '../../services/limitHeader.service';

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
  listFilter: Asiento[];
  filtrosData: FiltroAsiento = {
    inicio: '',
    fin: '',
    origen: '',
    usuario: '',
    estado: '',
  };

  constructor(
    private asientosService: AsientosService,
    private route: ActivatedRoute,
    private router: Router,
    private lineHeaderService: LimitHeaderService,
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
      .pipe(finalize(() => this.setData()))
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
            cuentas: undefined,
          }))
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
