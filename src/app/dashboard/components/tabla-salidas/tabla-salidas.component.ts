import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Salida } from 'src/app/shared';

@Component({
  selector: 'app-tabla-salidas',
  templateUrl: './tabla-salidas.component.html',
  styleUrls: ['./tabla-salidas.component.scss']
})
export class TablaSalidasComponent implements OnInit {

  @Input() salidas: Salida[] = [];

  displayedColumns: string[] = ['fecha', 'interfaz', 'nombreArchivo', 'estado', 'cantidadLineas', 'fechaGeneracion', 'fechaLectura'];

  constructor() { }

  ngOnInit(): void {
  }

}
