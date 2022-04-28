import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { NewParameterComponent } from '../../components/new-parameter/new-parameter.component';
import { RegistroReporteComponent } from '../../components/registro-reporte/registro-reporte.component';

@Component({
  selector: 'app-tabla-ejecucion',
  templateUrl: './tabla-ejecucion.component.html',
  styleUrls: ['./tabla-ejecucion.component.scss']
})
export class TablaEjecucionComponent extends UnsubcribeOnDestroy {
  displayedColumns: string[] = ['nombre', 'fechaIni', 'fechaFin', 'estado', 'ruta', 'log'];
  spinner  = false;
  loading = false;
  informationsList = [];

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {
    super();
  }

  addNewInformation(event: any): void {
    if (event?.srcElement.tagName == "MAT-ICON") {
      const dialogRef = this.dialog.open(RegistroReporteComponent, {
        width: '80%',
        maxWidth: '400px',
        data: null,
        panelClass: 'my-dialog',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result?.status) {
          this.toastr.success(result?.message, 'Registrado')
        }
      });
    }
  }
}
