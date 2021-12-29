import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CorreccionFiltrosService } from '../../../core/services/correccion-filtros.service';

import { ReprocesoService } from '../../../core/services/reproceso.service';
import { CorreccionFiltro } from '../../../shared';
import { Maestra } from '../../../shared/models/maestra.model';

@Component({
  selector: 'app-editar-filtro',
  templateUrl: './editar-filtro.component.html',
  styleUrls: ['./editar-filtro.component.scss']
})
export class EditarFiltroComponent {

  editarFiltroForm = new FormGroup({
    columna: new FormControl(this.filtro?.columna),
    criterio: new FormControl(this.filtro?.criterio),
    valor: new FormControl(this.filtro?.valor),
  });
  loadingCargas: boolean = false;

  columnaOptions: Maestra[] = [];
  criterioOptions: string[] = ['contiene', 'es igual a', 'mayor que'];

  boton: string = this.filtro === null ? 'Agregar' : 'Cambiar';

  constructor(
    public dialogRef: MatDialogRef<EditarFiltroComponent>,
    @Inject(MAT_DIALOG_DATA) public filtro: CorreccionFiltro,
    private correccionFiltrosService: CorreccionFiltrosService,
    private reprocesoService: ReprocesoService
  ) { }

  ngOnInit(): void {
    

    let origen = this.correccionFiltrosService.getOrigen();
    let tipoArchivo1 = this.correccionFiltrosService.getTipoArchivo();
    console.log(tipoArchivo1);
    if (tipoArchivo1 == 'HEADER') {
      this.GetColumnas(origen,1);
    } else if (tipoArchivo1 == 'LINE') {
      this.GetColumnas(origen,2);
    }
    console.log('prueba Filtro');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {

   /* if (this.filtro === null) {
      this.correccionFiltrosService.addFiltro(this.editarFiltroForm.value);
    } else {
      this.correccionFiltrosService.editFiltro(this.editarFiltroForm.value);
    }
    */
 
    this.guardar(this.editarFiltroForm.value);
    
  }

  guardar(filtro: CorreccionFiltro) {
    const objeto = {
      Columna:filtro.columna,
      Criterio:filtro.criterio,
      Valor:filtro.valor,
      IdArchivoZip:this.correccionFiltrosService.getIdCarga(),
      TipoArchivo: this.correccionFiltrosService.getTipoArchivo(),
      TipoFiltro: "FILTRO",
      Usuario:""
    }
    this.correccionFiltrosService.postTsRegistroCorreccionAHCWS(objeto).subscribe(
      res => {
        console.log('res' + res)
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

  GetColumnas(ori: string, tipo: number): void {
    
    const origen = ori;
    const tipoColumna = tipo;
    
    this.reprocesoService.postTsFahColumnaProcesoAHCWS(
      origen,tipoColumna
    ).subscribe(
      data => {
        console.log(data);
        this.columnaOptions = data
      }/*console.log('data: '+data)*/,
      error => console.log(error),
      () => this.loadingCargas = false,
    );
  }

}
