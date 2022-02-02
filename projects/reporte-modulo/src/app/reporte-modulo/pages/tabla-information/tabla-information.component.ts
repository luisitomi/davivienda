import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { NewParameterComponent } from '../../components/new-parameter/new-parameter.component';

@Component({
  selector: 'app-tabla-information',
  templateUrl: './tabla-information.component.html',
  styleUrls: ['./tabla-information.component.scss']
})
export class TablaInformationComponent extends UnsubcribeOnDestroy {
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

  addNewInformation(): void {
    const dialogRef = this.dialog.open(NewParameterComponent, {
      width: '80%',
      maxWidth: '1000px',
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
