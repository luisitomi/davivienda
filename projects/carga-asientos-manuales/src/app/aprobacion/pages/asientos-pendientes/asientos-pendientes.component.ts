import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Asiento } from 'src/app/shared';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { FiltroAsiento } from '../../models/filtro-asiento.model';
import { LimitHeader } from '../../models/limite.model';
import { AsientosService } from '../../services/asientos.service';
import { LimitHeaderService } from '../../services/limitHeader.service';

@Component({
  selector: 'app-asientos-pendientes',
  templateUrl: './asientos-pendientes.component.html',
  styleUrls: ['./asientos-pendientes.component.scss']
})
export class AsientosPendientesComponent extends UnsubcribeOnDestroy implements OnInit, OnDestroy {

  asientos: Asiento[] = [];

  getAsientosSub?: Subscription;
  aprobarSub?: Subscription;
  rechazarSub?: Subscription;

  loadingAsientos: boolean = false;

  filtros: FiltroAsiento = {
    inicio: undefined,
    fin: undefined,
    origen: 0,
    usuario: '',
    estado: '',
    cuenta: '',
  };

  constructor(
    private asientosService: AsientosService,
    private snackBar: MatSnackBar,
    private lineHeaderService: LimitHeaderService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.filtrar(this.filtros);
  }

  ngOnDestroy(): void {
  }

  filtrar(filtros: FiltroAsiento): void {
    this.loadingAsientos = true;
    const $subas = this.lineHeaderService
      .getLimitsHeader(filtros)
      .pipe(finalize(() => this.loadingAsientos = false))
      .subscribe(
        (asiento: LimitHeader[]) => {
          this.asientos = (asiento || []).map((item) => ({
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

  aprobar(asientos: Asiento[]): void {
  }

  rechazar(asientos: Asiento[]): void {
  }

  openSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje);
  }

}
