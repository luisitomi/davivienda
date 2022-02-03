import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { ReporteService } from '../../../core/services/reporte.service';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { FiltroReporte } from '../../../shared/models/filtro-reporte.model';
import { Reporte } from '../../../shared/models/reporte.model';
import { NewParameterComponent } from '../../components/new-parameter/new-parameter.component';

@Component({
  selector: 'app-tabla-information',
  templateUrl: './tabla-information.component.html',
  styleUrls: ['./tabla-information.component.scss']
})
export class TablaInformationComponent extends UnsubcribeOnDestroy {
  displayedColumns: string[] = ['Id', 'Nombre Reporte', 'Codigo Reporte', 'Ruta Reporte', 'Nombre Archivo'];
  spinner  = false;
  loading = false;
  informationsList: Reporte[];

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private reporteService: ReporteService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
   
  }
  editar(reporte: Reporte) {
    
     this.router.navigate(['/reporte-information/registro',reporte.Id]);
  }
  filtrar(filtroReporte: FiltroReporte) {
    this.spinner = true;
    this.reporteService.postTsFAHListadoModuloReporteWS(filtroReporte).subscribe(res => {
      this.informationsList = res;
      this.spinner = false;
    },
    ()=> {
      this.spinner = false;
    });
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
