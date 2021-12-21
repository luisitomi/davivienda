import { ElementRef, ViewChild } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoLinea } from '../../enums/tipo-linea.enum';
import { Linea } from '../../models/linea.model';
import { AsientoManualService } from '../../services/asiento-manual.service';

@Component({
  selector: 'app-editar-linea',
  templateUrl: './editar-linea.component.html',
  styleUrls: ['./editar-linea.component.scss']
})
export class EditarLineaComponent {

  @ViewChild('debitoControl') debitoElementRef?: ElementRef;
  @ViewChild('creditoControl') creditoElementRef?: ElementRef;

  editarLineaForm = new FormGroup({
    index: new FormControl(0),
    moneda: new FormControl('COP', Validators.required),
    tipo: new FormControl(),
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
      let { columnasReferenciales, combinacionContable, ...linea } = this.linea;
      this.editarLineaForm.setValue(linea);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.linea === null) {
      this.asientoManualService.addLinea({ ...this.editarLineaForm.value, columnasReferenciales: [], combinacionContable: undefined });
    } else {
      this.asientoManualService.editLinea({ ...this.editarLineaForm.value, columnasReferenciales: this.linea.columnasReferenciales, combinacionContable: this.linea.combinacionContable });
    }
    this.dialogRef.close();
  }

  cambiarTipo(tipo: string): void {
    let debito = this.editarLineaForm.controls.debito;
    let credito = this.editarLineaForm.controls.credito;

    setTimeout(() => {
      if (tipo === this.tipoOptions.Debito) {
        debito.enable();
        credito.disable();
        this.editarLineaForm.patchValue({ credito: null });
        this.debitoElementRef?.nativeElement.focus();
      }

      if (tipo === this.tipoOptions.Credito) {
        debito.disable();
        credito.enable();
        this.editarLineaForm.patchValue({ debito: null });
        this.creditoElementRef?.nativeElement.focus();
      }
    });

  }

}
