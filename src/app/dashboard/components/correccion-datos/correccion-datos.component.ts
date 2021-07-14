import { Component, OnInit } from '@angular/core';
import { CorreccionColumna } from 'src/app/shared/models/correccion-columna.model';
import { CorreccionFiltro } from 'src/app/shared/models/correccion-filtro.model';

@Component({
  selector: 'app-correccion-datos',
  templateUrl: './correccion-datos.component.html',
  styleUrls: ['./correccion-datos.component.scss']
})
export class CorreccionDatosComponent implements OnInit {

  filtros: CorreccionFiltro[] = [
    { columna: 'PRODUCTO', criterio: 'igual a', valor: 'TARJETA DAVIVIENDA' },
    { columna: 'CLIENTE', criterio: 'contiene', valor: 'RAMIEZ' },
  ];
  columnas: CorreccionColumna[] = [
    { columna: 'Fecha contable', tipo: 'Fecha', valor: '20210128' },
    { columna: 'Fecha contable', tipo: 'Fecha', valor: '20210128' },
  ];

  filtrosDisplayedColumns: string[] = ['numeracion', 'columna', 'criterio', 'valor'];
  columnasDisplayedColumns: string [] = ['numeracion', 'columna', 'tipo', 'valor'];

  constructor() { }

  ngOnInit(): void {
  }

}
