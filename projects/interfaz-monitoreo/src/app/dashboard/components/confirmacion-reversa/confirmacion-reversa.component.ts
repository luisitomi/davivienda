import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-reversa',
  templateUrl: './confirmacion-reversa.component.html',
  styleUrls: ['./confirmacion-reversa.component.scss']
})
export class ConfirmacionReversaComponent implements OnInit {

  filterForm = new FormGroup({
    fechaContable: new FormControl(new Date()),
  });
  minDate = new Date();
  constructor(
    private dialogRef: MatDialogRef<ConfirmacionReversaComponent>,
    @Inject(MAT_DIALOG_DATA) public texto: string,
  ) { }

  ngOnInit(): void {
  }

  onCancelar(): void {
    this.dialogRef.close();
  }

  onAceptar(): void {
    let prmBean = {
      fecha: null
    };
    if (this.filterForm.controls['fechaContable'].value == undefined || this.filterForm.controls['fechaContable'].value == null) {
      prmBean.fecha = null;
    } else {
      prmBean.fecha = this.filterForm.controls['fechaContable'].value;
    }
    console.log('fechaContable: ' +this.filterForm.controls['fechaContable'].value)
    this.dialogRef.close(prmBean);
  }

}
