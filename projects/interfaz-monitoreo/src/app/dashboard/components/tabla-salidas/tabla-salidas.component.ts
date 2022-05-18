import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SalidasService } from '../../../core/services/salidas.service';
import { Salida } from '../../../shared';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { TxtLog } from '../../../shared/models/txtLog.model';
import { FiltroPerfilComponent } from '../filtro-perfil/filtro-perfil.component';

@Component({
  selector: 'app-tabla-salidas',
  templateUrl: './tabla-salidas.component.html',
  styleUrls: ['./tabla-salidas.component.scss']
})
export class TablaSalidasComponent extends UnsubcribeOnDestroy implements OnInit {

  @Input() salidas: Salida[] = [];

  @Input() loading: boolean = false;

  displayedColumns: string[] = ['fecha', 'interfaz', 'nombreArchivo', 'estado', 'cantidadLineas', 'fechaGeneracion', 'Log'/*, 'fechaLectura'*/];

  txtLog: TxtLog[] = [];

  constructor(
    private salidasService: SalidasService,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
  }
  /*
    clickVer(cargaId: number): void {
      this.mostrarDetalle.emit(cargaId);
    }*/
  download(prmBean: Salida): void {

    // prmBean.id = 2788;
    this.salidasService.postTxtLog(prmBean.id).subscribe((rest: any) => {
      this.txtLog = rest;

      var contenido = this.convertToTXT(this.txtLog);

      const a = document.createElement("a");
      const archivo = new Blob([contenido], { type: 'text/plain' });
      const url = URL.createObjectURL(archivo);
      a.href = url;
      a.download = prmBean.nombreArchivo.replace('zip', 'txt');
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

  executeFunctionModal() {
    this.dialog.open(FiltroPerfilComponent, {
      width: '80%',
      maxWidth: '400px',
      data: {id: 1},
      panelClass: 'my-dialog',
    });
  }
}
