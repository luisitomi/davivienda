import { Component, Input, OnInit } from '@angular/core';
import { Salida } from 'src/app/shared';
import { SalidasService } from '../../../core/services/salidas.service';
import { TxtLog } from '../../../shared/models/txtLog.model';

@Component({
  selector: 'app-tabla-salidas',
  templateUrl: './tabla-salidas.component.html',
  styleUrls: ['./tabla-salidas.component.scss']
})
export class TablaSalidasComponent implements OnInit {

  @Input() salidas: Salida[] = [];

  @Input() loading: boolean = false;

  displayedColumns: string[] = ['fecha', 'interfaz', 'nombreArchivo', 'estado', 'cantidadLineas', 'fechaGeneracion','Log'/*, 'fechaLectura'*/];

  txtLog: TxtLog[] = [];

  constructor( private salidasService: SalidasService,) { }

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

  var contenido =     this.convertToTXT(this.txtLog);
        console.log(contenido);
        const a = document.createElement("a"); 
        const archivo = new Blob([contenido], { type: 'text/plain' });
        const url = URL.createObjectURL(archivo);
        a.href = url;
        a.download = prmBean.nombreArchivo.replace('zip','txt');
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
        console.log(dataset.mensaje)
        row += dataset.mensaje + '\r\n';
      }
      return row;
    }
}
