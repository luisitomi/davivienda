import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { Asiento } from 'src/app/shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { LimitHeader } from '../../models/limite.model';
import { LimitHeaderService } from '../../services/limitHeader.service';

@Component({
  selector: 'app-asientos-pendientes',
  templateUrl: './asientos-pendientes.component.html',
  styleUrls: ['./asientos-pendientes.component.scss'],
  providers: [DatePipe],
})
export class AsientosPendientesComponent extends UnsubcribeOnDestroy implements OnInit {
  asientos: Asiento[] = [];
  loadingAsientos: boolean = false;
  spinner = false;

  filtros = null;

  constructor(
    private snackBar: MatSnackBar,
    private lineHeaderService: LimitHeaderService,
    private datePipe: DatePipe,
  ) {
    super();
  }

  ngOnInit(): void {
    this.filtrar(this.filtros);
  }

  method () : void {
    this.loadingAsientos = false
    this.spinner = false
  }

  filtrar(filtros: any): void {
    let request = {};
    this.loadingAsientos = true;
    if (filtros) {
      request = {
        estado: '',
        origen: filtros?.origen || '',
        usuario: filtros?.usuario || '',
        fin: this.datePipe.transform(filtros?.fin, appConstants.eventDate.format2) || '',
        inicio: this.datePipe.transform(filtros?.inicio, appConstants.eventDate.format2) || ''
      }
    }
    this.spinner = true;
    const $subas = this.lineHeaderService
      .getLimitsHeader(request || filtros)
      .pipe(finalize(() => this.method()))
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
