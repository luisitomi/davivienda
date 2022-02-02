import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CorreccionFiltrosService } from 'src/app/core/services/correccion-filtros.service';
import { CorreccionFiltro } from 'src/app/shared';

@Component({
  selector: 'app-editar-filtro',
  templateUrl: './editar-filtro.component.html',
  styleUrls: ['./editar-filtro.component.scss']
})
export class EditarFiltroComponent {

  editarFiltroForm = new FormGroup({
    columna: new FormControl(this.filtro?.columna),
    criterio: new FormControl(this.filtro?.criterio),
    valor: new FormControl(this.filtro?.valor),
  });

  columnaOptions: string[] = ['CLIENTE', 'FECHA'];
  criterioOptions: string[] = ['contiene', 'es igual a', 'mayor que'];

  boton: string = this.filtro === null ? 'Agregar' : 'Cambiar';

  constructor(
    public dialogRef: MatDialogRef<EditarFiltroComponent>,
    @Inject(MAT_DIALOG_DATA) public filtro: CorreccionFiltro,
    private correccionFiltrosService: CorreccionFiltrosService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.filtro === null) {
      this.correccionFiltrosService.addFiltro(this.editarFiltroForm.value);
    } else {
      this.correccionFiltrosService.editFiltro(this.editarFiltroForm.value);
    }

    this.dialogRef.close();
  }

}
