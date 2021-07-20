import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReferenciaComplementaria } from 'src/app/shared';
import { AsientoManualService } from '../../services/asiento-manual.service';

@Component({
  selector: 'app-editar-referencia',
  templateUrl: './editar-referencia.component.html',
  styleUrls: ['./editar-referencia.component.scss']
})
export class EditarReferenciaComponent {

  linea: number = 0;

  editarRefForm = new FormGroup({
    index: new FormControl(0),
    nombre: new FormControl('', Validators.required),
    valor: new FormControl(null, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<EditarReferenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private asientoManualService: AsientoManualService,
  ) {
    this.linea = this.data.linea;

    if (this.data.referencia !== undefined) {
      this.editarRefForm.setValue(this.data.referencia);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if(this.data.referencia === undefined) {
      this.asientoManualService.addReferencia(this.linea, this.editarRefForm.value);
    } else {
      this.asientoManualService.editReferencia(this.linea, this.editarRefForm.value);
    }
    this.dialogRef.close();
  }

}
