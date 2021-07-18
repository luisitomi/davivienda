import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FiltroSincronizacion } from 'src/app/shared';

@Component({
  selector: 'app-filtros-sincronizaciones',
  templateUrl: './filtros-sincronizaciones.component.html',
  styleUrls: ['./filtros-sincronizaciones.component.scss']
})
export class FiltrosSincronizacionesComponent implements OnInit {

  @Output() filtrar = new EventEmitter<FiltroSincronizacion>();

  filtrosForm = new FormGroup({
    proceso: new FormControl(),
    estado: new FormControl(''),
    readInicio: new FormControl(),
    readFin: new FormControl(),
  });

  estadoOptions: string[] = ['Error de Lectura', 'Leído'];

  constructor() { }

  ngOnInit(): void {
  }

  onFiltrar(): void {
    this.filtrar.emit(this.filtrosForm.value);
  }

}
