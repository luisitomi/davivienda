import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CorreccionColumnasService } from 'src/app/core/services/correccion-columnas.service';
import { Columna } from 'src/app/shared';

@Component({
  selector: 'app-editar-columna',
  templateUrl: './editar-columna.component.html',
  styleUrls: ['./editar-columna.component.scss']
})
export class EditarColumnaComponent {

  editarColumnaForm = new FormGroup({
    columna: new FormControl({}),
    valor: new FormControl(''),
  });

  columnas: Columna[] = [
    { nombre: 'Fecha contable', tipo: 'Fecha' },
    { nombre: 'Monto total', tipo: 'Numerico' },
    { nombre: 'Observaciones', tipo: 'Texto' },
  ];

  constructor(
    public dialogRef: MatDialogRef<EditarColumnaComponent>,
    private correccionColumnasService: CorreccionColumnasService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    let { columna, valor } = this.editarColumnaForm.value;
    this.correccionColumnasService.addColumna({ columna: columna.nombre, tipo: columna.tipo, valor })
    this.dialogRef.close();
  }

}
