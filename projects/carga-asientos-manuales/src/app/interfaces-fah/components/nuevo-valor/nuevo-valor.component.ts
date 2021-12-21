import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Lista } from '../../models/lista.model';
import { MantenimientoService } from '../../services/mantenimiento.service';

@Component({
  selector: 'app-nuevo-valor',
  templateUrl: './nuevo-valor.component.html',
  styleUrls: ['./nuevo-valor.component.scss']
})
export class NuevoValorComponent {

  nuevoForm = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl(null, [Validators.required]),
  });

  nuevoValorSub?: Subscription;

  constructor(
    private mantenimientoService: MantenimientoService,
    private dialogRef: MatDialogRef<NuevoValorComponent>,
    @Inject(MAT_DIALOG_DATA) public lista: Lista,
    private snackBar: MatSnackBar,
  ) { }

  guardar(): void {
    this.nuevoValorSub = this.mantenimientoService.nuevoValor(this.lista.id, this.nuevoForm.value).subscribe(
      ok => {
        this.snackBar.open('Valor creado');
        this.dialogRef.close('creado');
      },
    );
  }

}
