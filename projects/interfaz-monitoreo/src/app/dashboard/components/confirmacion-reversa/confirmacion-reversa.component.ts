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
    fechaContable: new FormControl(new Date('12/12/2017')),
  });

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
    let date = null;
    if (this.filterForm.controls['fechaContable'].value == undefined || this.filterForm.controls['fechaContable'].value == null) {
      date = null;
    } else {
      date = this.filterForm.controls['fechaContable'].value;
    }
    console.log('fechaContable: ' +this.filterForm.controls['fechaContable'].value)
    this.dialogRef.close(date);
  }

}
