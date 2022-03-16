import { OnDestroy } from '@angular/core';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { SincronizacionesService } from '../../../core/services/sincronizaciones.service';
import { FiltroSincronizacion } from '../../../shared';


@Component({
  selector: 'app-filtros-sincronizaciones',
  templateUrl: './filtros-sincronizaciones.component.html',
  styleUrls: ['./filtros-sincronizaciones.component.scss']
})
export class FiltrosSincronizacionesComponent implements OnInit, OnDestroy {

  @Output() filtrar = new EventEmitter<FiltroSincronizacion>();

  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;

  filtrosForm = new FormGroup({
    proceso: new FormControl(),
    estado: new FormControl(''),
    readInicio: new FormControl(),
    readFin: new FormControl(),
  });

  estadoOptions: string[] = [];
  getEstadosSub?: Subscription;

  constructor(
    private sincronizacionesService: SincronizacionesService,
  ) { }

  ngOnInit(): void {
    this.getEstadosSub = this.sincronizacionesService.getEstados().subscribe(
      estados => this.estadoOptions = estados,
    );
  }

  ngOnDestroy(): void {
    this.getEstadosSub?.unsubscribe();
  }

  onFiltrar(): void {
    this.filtrar.emit(this.filtrosForm.value);
    this.panel?.close();
  }

}
