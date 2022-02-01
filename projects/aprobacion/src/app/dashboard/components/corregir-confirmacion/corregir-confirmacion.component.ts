import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-corregir-confirmacion',
  templateUrl: './corregir-confirmacion.component.html',
  styleUrls: ['./corregir-confirmacion.component.scss']
})
export class CorregirConfirmacionComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CorregirConfirmacionComponent>,
  ) { }

  ngOnInit(): void {
  }

  onCancelar(): void {
    this.dialogRef.close();
  }

  onAceptar(): void {
    this.dialogRef.close('ok');
  }

}
