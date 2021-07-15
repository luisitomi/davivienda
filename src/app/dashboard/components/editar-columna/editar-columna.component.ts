import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CorreccionColumnasService } from 'src/app/core/services/correccion-columnas.service';
import { Columna, CorreccionColumna } from 'src/app/shared';

@Component({
  selector: 'app-editar-columna',
  templateUrl: './editar-columna.component.html',
  styleUrls: ['./editar-columna.component.scss']
})
export class EditarColumnaComponent implements OnInit {

  editarColumnaForm = new FormGroup({
    columna: new FormControl(this.columna?.columna),
    valor: new FormControl(this.columna?.valor),
  });

  columnas: Columna[] = [
    { nombre: 'Fecha contable', tipo: 'Fecha' },
    { nombre: 'Monto total', tipo: 'Numerico' },
    { nombre: 'Observaciones', tipo: 'Texto' },
  ];

  tipo: string = this.columnas.find(c => c.nombre === this.columna?.columna)?.tipo || '';

  boton: string = this.columna === null ? 'Agregar' : 'Cambiar';

  constructor(
    public dialogRef: MatDialogRef<EditarColumnaComponent>,
    @Inject(MAT_DIALOG_DATA) public columna: CorreccionColumna,
    private correccionColumnasService: CorreccionColumnasService,
  ) { }

  ngOnInit(): void {
    this.editarColumnaForm.valueChanges.subscribe(v => {
      this.tipo = this.columnas.find(c => c.nombre === v.columna)?.tipo || '';
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    let { columna, valor } = this.editarColumnaForm.value;

    if (this.columna === null) {
      this.correccionColumnasService.addColumna({ columna, tipo: this.tipo, valor });
    } else {
      this.correccionColumnasService.editColumna({ columna, tipo: this.tipo, valor });
    }

    this.dialogRef.close();
  }

}
