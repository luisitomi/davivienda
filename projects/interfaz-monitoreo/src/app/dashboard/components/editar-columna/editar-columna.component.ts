import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { CorreccionColumnasService } from '../../../core/services/correccion-columnas.service';
import { ReprocesoService } from '../../../core/services/reproceso.service';
import { Columna, CorreccionColumna } from '../../../shared';
import { CorreccionColumnaValores } from '../../../shared/models/correccion-columna-valores.model';
import { Maestra } from '../../../shared/models/maestra.model';


@Component({
  selector: 'app-editar-columna',
  templateUrl: './editar-columna.component.html',
  styleUrls: ['./editar-columna.component.scss']
})
export class EditarColumnaComponent implements OnInit {

 // columna = this.correccionValores.correccionColumna;
  editarColumnaForm = new FormGroup({
    columna: new FormControl(this.columna?.columna),
    valor: new FormControl(this.columna?.valor),
  });
  tipoArchivo = "";
  columnas: Maestra[] = [ ];
  loadingCargas: boolean = false;
 /* columnas: Maestra[] = [
    { nombre: 'Fecha contable', tipo: 'Fecha' },
    { nombre: 'Monto total', tipo: 'Numerico' },
    { nombre: 'Observaciones', tipo: 'Texto' },
  ]; */
  //columna: CorreccionColumna;
  //

  tipo: string = this.columnas.find(c => c.valor === this.columna?.columna)?.tipo || '';

  boton: string = this.columna === null ? 'Agregar' : 'Cambiar';

  constructor(
    public dialogRef: MatDialogRef<EditarColumnaComponent>,
    @Inject(MAT_DIALOG_DATA) public columna: CorreccionColumna,
  //  @Inject(MAT_DIALOG_DATA) public correccionValores: CorreccionColumnaValores,
    private correccionColumnasService: CorreccionColumnasService,
    private reprocesoService: ReprocesoService,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
    
    let origen = this.correccionColumnasService.getOrigen();
    let tipoArchivo1 = this.correccionColumnasService.getTipoArchivo();
   
    if (tipoArchivo1 == 'HEADER') {
      this.GetColumnas(origen,1);
    } else if (tipoArchivo1 == 'LINE') {
      this.GetColumnas(origen,2);
    }

    this.editarColumnaForm.valueChanges.subscribe(v => {
      this.tipo = this.columnas.find(c => c.valor === v.columna)?.tipo || '';
    });
  } 

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    let { columna, valor } = this.editarColumnaForm.value;
/*
    if (this.columna === null) {
      this.correccionColumnasService.addColumna({ columna, tipo: this.tipo, valor });
    } else {
      this.correccionColumnasService.editColumna({ columna, tipo: this.tipo, valor });
    }

    this.dialogRef.close(); */

    this.guardar({ columna, tipo: this.tipo, valor });
  }

  guardar(filtro: CorreccionColumna) {
    const objeto = {
      Columna:filtro.columna,
      Criterio:'',
      Valor:filtro.valor,
      IdArchivoZip:this.correccionColumnasService.getIdCarga(),
      TipoArchivo: this.correccionColumnasService.getTipoArchivo(),
      TipoFiltro: "COLUMNA",
      Usuario:this.authService.getUsuarioV2()
    }
    this.correccionColumnasService.postTsRegistroCorreccionAHCWS(objeto).subscribe(
      res => {
       
        this.dialogRef.close('OK');
        /*
        if (this.filtro === null) {
          this.correccionFiltrosService.addFiltro(this.editarFiltroForm.value);
        } else {
          this.correccionFiltrosService.editFiltro(this.editarFiltroForm.value);
        } */
      }

    );
  }

 
  GetColumnas(ori:string, tipo:number): void {
    
    const origen =ori;
    const tipoColumna = tipo;
    
    this.reprocesoService.postTsFahColumnaProcesoAHCWS(
      origen,tipoColumna
    ).subscribe(
      data =>{
       
        this.columnas = data}/*console.log('data: '+data)*/,
      error => console.log(error),
      () => this.loadingCargas = false,
    );
  }

}
