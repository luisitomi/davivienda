import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Carga } from 'src/app/shared';
import { Elemento } from 'src/app/shared';

@Component({
  selector: 'app-detalle-archivo',
  templateUrl: './detalle-archivo.component.html',
  styleUrls: ['./detalle-archivo.component.scss']
})
export class DetalleArchivoComponent {

  elemento = Elemento;

  constructor(
    public dialogRef: MatDialogRef<DetalleArchivoComponent>,
    @Inject(MAT_DIALOG_DATA) public carga: Carga,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
