import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CorreccionFiltrosService } from 'src/app/core/services/correccion-filtros.service';

@Component({
  selector: 'app-editar-filtro',
  templateUrl: './editar-filtro.component.html',
  styleUrls: ['./editar-filtro.component.scss']
})
export class EditarFiltroComponent {

  editarFiltroForm = new FormGroup({
    columna: new FormControl(''),
    criterio: new FormControl(''),
    valor: new FormControl(''),
  });

  columnaOptions: string[] = ['CLIENTE', 'FECHA'];
  criterioOptions: string[] = ['contiene', 'es igual a', 'mayor que'];

  constructor(
    public dialogRef: MatDialogRef<EditarFiltroComponent>,
    @Inject(MAT_DIALOG_DATA) public columnas: string[],
    private correccionFiltrosService: CorreccionFiltrosService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.correccionFiltrosService.addFiltro(this.editarFiltroForm.value);
    this.dialogRef.close();
  }

}
