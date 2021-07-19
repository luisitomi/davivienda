import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Linea } from 'src/app/shared';
import { AsientoManualService } from '../../services/asiento-manual.service';

@Component({
  selector: 'app-editar-linea',
  templateUrl: './editar-linea.component.html',
  styleUrls: ['./editar-linea.component.scss']
})
export class EditarLineaComponent {

  editarLineaForm = new FormGroup({
    index: new FormControl(0),
    combinacionContable: new FormControl('', Validators.required),
    moneda: new FormControl('COP', Validators.required),
    debito: new FormControl(null, Validators.required),
    credito: new FormControl(null, Validators.required),
    columnasReferenciales: new FormControl('', Validators.required),
  });

  monedaOptions: string[] = ['COP', 'USD'];

  constructor(
    public dialogRef: MatDialogRef<EditarLineaComponent>,
    @Inject(MAT_DIALOG_DATA) public linea: Linea,
    private asientoManualService: AsientoManualService,
  ) {
    if (linea !== null) {
      this.editarLineaForm.setValue(linea);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.linea === null) {
      this.asientoManualService.addLinea(this.editarLineaForm.value);
    } else {
      this.asientoManualService.editLinea(this.editarLineaForm.value);
    }
    this.dialogRef.close();
  }

}
