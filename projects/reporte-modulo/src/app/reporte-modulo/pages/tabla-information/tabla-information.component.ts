import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as saveAs from 'file-saver';
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
  displayedColumns: string[] = ['Id', 'NombreReporte', 'CodigoReporte', 'FechaEjecucion', 'FechaFinEjecucion', 'Creadopor','Estado', 'log', 'archivo'];
  spinner = false;
  loading = false;
  informationsList: ListadoEjecucionReporte[];
  listadoEjecucionReporte: ListadoEjecucionReporte;
  txtLog: TxtLog[] = [];

  filtrosForm: FormGroup;
  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private ejecucionReporteService: ReporteEjecucionService,
    private formBuilder: FormBuilder,
  ) {
    super();
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.filtrosForm = this.formBuilder.group({
      NombreReporte: [null, []],
      CodigoReporte: [null, []],
      Estado: ["Procesando", []],
      FechaInicio: [null, []],
      FechaFin: [null, []],
      Id: [0, []],
      CreadoPor: [null, []],
    });

  }


  addNewInformation(event: any): void {
    if (event?.srcElement.tagName == "MAT-ICON") {
      const dialogRef = this.dialog.open(NewParameterComponent, {
        width: '80%',
        maxWidth: '1000px',
        data: null,
        panelClass: 'my-dialog',
      });

      dialogRef.afterClosed().subscribe(result => {


        this.refrescar();
        if (result?.status) {
          this.toastr.success(result?.message, 'Registrado')

        }
      });
    }
  }
  refrescar() {
    this.filtrar(this.filtrosForm.value);
  }
  filtrar(data: ListadoEjecucionReporte) {

    let fechaInicio = "";
    let fechaFin = "";
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
    let Idb  = "";
    Idb == data.Id.toString();
    const prmBean = {
      NombreReporte: (data.NombreReporte == null ? "" : data.NombreReporte),
      CodigoReporte: (data.CodigoReporte == null ? "" : data.CodigoReporte),
      Estado: (data.Estado == null ? "" : data.Estado),
      FechaInicio: fechaInicio,
      FechaFin: fechaFin,
      Id: ( (Idb == null || Idb == '' )? 0 :data.Id),
      Usuario: data.CreadoPor
    }

    this.ejecucionReporteService.posTsFAHListarEjecucionReporteWS(prmBean).subscribe(
      rest => {

        this.informationsList = rest;
        this.spinner = false;

      },
      () => {
        this.spinner = false;
        this.informationsList = [];
      }
    );
  }

  download(prmBean: ListadoEjecucionReporte): void {

    // prmBean.id = 2788;
    this.ejecucionReporteService.postTsFahTxtTraceModuloReporteWS(prmBean.IdEjecucion).subscribe((rest: any) => {
      this.txtLog = rest;

      var contenido = this.convertToTXT(this.txtLog);

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

  removeChanges() {

  }

  downloadFile(element: any): void {
    this.spinner = true;
    const $subfile = this.ejecucionReporteService
    .getFile(element?.IdEjecucion)
    .pipe(finalize(() => this.spinner = false))
    .subscribe(
      (response: any) => {
        response.forEach((item: any) => {
         this.ejecucionReporteService.getDownoadFile(item?.RUTA).subscribe(
           (rpta: any) => {
            saveAs(rpta, item?.NOMBRE_ARCHIVO.replace('_'+item?.ID_EJECUCION, ''));
           }
         )
       });
      }
    )
    this.arrayToDestroy.push($subfile)
  }
}
