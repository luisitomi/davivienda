import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { ReporteEjecucionService } from '../../../core/services/reporte-ejecucion.service';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { ListadoEjecucionReporte } from '../../../shared/models/listado-ejecucion-reporte.model';
import { TxtLog } from '../../../shared/models/txtLog.model';
import { NewParameterComponent } from '../../components/new-parameter/new-parameter.component';

@Component({
  selector: 'app-tabla-information',
  templateUrl: './tabla-information.component.html',
  styleUrls: ['./tabla-information.component.scss']
})
export class TablaInformationComponent extends UnsubcribeOnDestroy {
  displayedColumns: string[] = ['Id','NombreReporte', 'CodigoReporte', 'FechaEjecucion', 'FechaFinEjecucion', 'Estado', 'log'];
  spinner  = false;
  loading = false;
  informationsList: ListadoEjecucionReporte[];
  txtLog: TxtLog[] = [];
  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private ejecucionReporteService: ReporteEjecucionService
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
  filtrar(data: ListadoEjecucionReporte) {

    let fechaInicio = "";
    let fechaFin ="";
    this.spinner = true;
        if (data.FechaInicio != null) {
          let day = data.FechaInicio.getDate();
          let month = data.FechaInicio.getMonth() + 1;
          let year = data.FechaInicio.getFullYear();
    
          if (month < 10) {
            fechaInicio = `${day}/0${month}/${year}`;
          } else {
            fechaInicio = `${day}/${month}/${year}`;
          }
        } else {
          fechaInicio = "01/01/2020";
        }
    
        if (data.FechaFin != null) {
          let day = data.FechaFin.getDate();
          let month = data.FechaFin.getMonth() + 1;
          let year = data.FechaFin.getFullYear();
    
          if (month < 10) {
            fechaFin = `${day}/0${month}/${year}`;
          } else {
            fechaFin = `${day}/${month}/${year}`;
          }
        } else {
          fechaFin = "01/01/2050";
        }
    
        const prmBean = {
          NombreReporte: (data.NombreReporte == null ? "" : data.NombreReporte ),
          CodigoReporte: (data.CodigoReporte == null ? "" : data.CodigoReporte ),
          Estado: (data.Estado == null ? "" : data.Estado) ,
          FechaInicio: fechaInicio,
          FechaFin: fechaFin
        }
        

    this.ejecucionReporteService.posTsFAHListarEjecucionReporteWS(prmBean).subscribe(
      rest=>{

        this.informationsList = rest;
        this.spinner = false;

      },
      ()=> {
        this.spinner = false;
        this.informationsList = [];
      }
    );
  }

  download(prmBean: ListadoEjecucionReporte): void {

    // prmBean.id = 2788;
     this.ejecucionReporteService.postTsFahTxtTraceModuloReporteWS(prmBean.IdEjecucion).subscribe((rest: any) => {
       this.txtLog = rest;
 
   var contenido =     this.convertToTXT(this.txtLog);
        
         const a = document.createElement("a"); 
         const archivo = new Blob([contenido], { type: 'text/plain' });
         const url = URL.createObjectURL(archivo);
         a.href = url;
         a.download = prmBean.CodigoReporte + ".txt";
         a.click();
         URL.revokeObjectURL(url);
        // this.lstTipoDocumento =  rest.data;
           });
     //this.mostrarDetalle.emit(cargaId);
   }
 
   convertToTXT(data: any) {
    let row = '';
 
    const separador = ';';
    //const head = header.split(del);

  //  console.log('entro al csv convert')
 //   console.log(data)
//    console.log('aqui la data')
    // creating the header
    /*for (const headerTxt of head) {
      row += headerTxt + del;
    }
    row += '\r\n';*/
    //  start with the rows
    for (const dataset of data) {
      let line = '';
 
      row += dataset.mensaje + '\r\n';
    }
    return row;
  }
}
