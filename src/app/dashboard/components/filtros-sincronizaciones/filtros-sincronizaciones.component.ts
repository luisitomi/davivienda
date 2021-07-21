import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { FiltroSincronizacion } from 'src/app/shared';

@Component({
  selector: 'app-filtros-sincronizaciones',
  templateUrl: './filtros-sincronizaciones.component.html',
  styleUrls: ['./filtros-sincronizaciones.component.scss']
})
export class FiltrosSincronizacionesComponent implements OnInit {

  @Output() filtrar = new EventEmitter<FiltroSincronizacion>();

  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;

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
    this.panel?.close();
  }

}
