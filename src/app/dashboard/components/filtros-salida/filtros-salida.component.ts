import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FiltroSalida } from 'src/app/shared';

@Component({
  selector: 'app-filtros-salida',
  templateUrl: './filtros-salida.component.html',
  styleUrls: ['./filtros-salida.component.scss']
})
export class FiltrosSalidaComponent implements OnInit {

  @Output() filtrar = new EventEmitter<FiltroSalida>();

  filtrosForm = new FormGroup({
    interfaz: new FormControl(''),
    estado: new FormControl(''),
    genInicio: new FormControl(),
    genFin: new FormControl(),
    readInicio: new FormControl(),
    readFin: new FormControl(),
    nombreArchivo: new FormControl(),
  });

  interfazOptions = ['GLCAI', 'BODEGA DE DATOS'];
  estadoOptions = ['Error de Generación', 'Error de Lectura', 'Generado', 'Leído'];

  constructor() { }

  ngOnInit(): void {
  }

  onFiltrar(): void {
    this.filtrar.emit(this.filtrosForm.value);
  }

}
