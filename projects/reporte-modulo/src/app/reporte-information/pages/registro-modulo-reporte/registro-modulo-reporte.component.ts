import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { Reporte } from '../../../shared/models/reporte.model';
import { NewParameterComponent } from '../../components/new-parameter/new-parameter.component';

@Component({
  selector: 'app-registro-modulo-reporte',
  templateUrl: './registro-modulo-reporte.component.html',
  styleUrls: ['./registro-modulo-reporte.component.scss']
})
export class RegistroModuloReporteComponent extends UnsubcribeOnDestroy {
  displayedColumns: string[] = ['nombre', 'fechaIni', 'fechaFin', 'estado', 'ruta', 'log'];
  spinner  = false;
  loading = false;
  informationsList = [];
  reporte: Reporte

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    super();
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    console.log('id:'+id)
  }
  addNewInformation(): void {
    const dialogRef = this.dialog.open(NewParameterComponent, {
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
