import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Linea } from 'src/app/shared';
import { TipoLinea } from '../../enums/tipo-linea.enum';
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
    tipo: new FormControl(''),
    debito: new FormControl(null),
    credito: new FormControl(null),
  });

  monedaOptions: string[] = ['COP', 'USD'];

  tipoOptions = TipoLinea;

  constructor(
    public dialogRef: MatDialogRef<EditarLineaComponent>,
    @Inject(MAT_DIALOG_DATA) public linea: Linea,
    private asientoManualService: AsientoManualService,
  ) {
    if (this.linea !== null) {
      let { columnasReferenciales, ...linea } = this.linea;
      this.editarLineaForm.setValue(linea);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.linea === null) {
      this.asientoManualService.addLinea({ ...this.editarLineaForm.value, columnasReferenciales: [] });
    } else {
      this.asientoManualService.editLinea({ ...this.editarLineaForm.value, columnasReferenciales: this.linea.columnasReferenciales });
    }
    this.dialogRef.close();
  }

  cambiarTipo(tipo: string): void {
    let debito = this.editarLineaForm.controls.debito;
    let credito = this.editarLineaForm.controls.credito;

    debito.clearValidators();
    credito.clearValidators();

    if(tipo === this.tipoOptions.Debito) {
      debito.setValidators(Validators.required);
      this.editarLineaForm.patchValue({ credito: null });
    }

    if(tipo === this.tipoOptions.Credito) {
      credito.setValidators(Validators.required);
      this.editarLineaForm.patchValue({ debito: null });
    }
  }

}
