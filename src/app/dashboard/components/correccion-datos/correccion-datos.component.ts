import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CorreccionColumnasService } from 'src/app/core/services/correccion-columnas.service';
import { CorreccionFiltrosService } from 'src/app/core/services/correccion-filtros.service';
import { EditarColumnaComponent } from '../editar-columna/editar-columna.component';
import { EditarFiltroComponent } from '../editar-filtro/editar-filtro.component';

@Component({
  selector: 'app-correccion-datos',
  templateUrl: './correccion-datos.component.html',
  styleUrls: ['./correccion-datos.component.scss']
})
export class CorreccionDatosComponent implements OnInit {

  filtrosDisplayedColumns: string[] = ['numeracion', 'columna', 'criterio', 'valor'];
  columnasDisplayedColumns: string [] = ['numeracion', 'columna', 'tipo', 'valor'];

  constructor(
    public correccionFiltrosService: CorreccionFiltrosService,
    public correccionColumnasService: CorreccionColumnasService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

  }

  crearFiltro() {
    const dialogRef = this.dialog.open(EditarFiltroComponent, {
      width: '300px',
    });
  }

  crearColumna() {
    const dialogRef = this.dialog.open(EditarColumnaComponent, {
      width: '300px',
    });
  }

}
