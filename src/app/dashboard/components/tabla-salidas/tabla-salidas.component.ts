import { Component, Input, OnInit } from '@angular/core';
import { Salida } from 'src/app/shared';

@Component({
  selector: 'app-tabla-salidas',
  templateUrl: './tabla-salidas.component.html',
  styleUrls: ['./tabla-salidas.component.scss']
})
export class TablaSalidasComponent implements OnInit {

  @Input() salidas: Salida[] = [];

  @Input() loading: boolean = false;

  displayedColumns: string[] = ['fecha', 'interfaz', 'nombreArchivo', 'estado', 'cantidadLineas', 'fechaGeneracion', 'fechaLectura'];

  constructor() { }

  ngOnInit(): void {
  }

}
