import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';

import { FiltroSalida } from 'src/app/shared';
import { SalidasService } from '../../../core/services/salidas.service';
import { Maestra } from '../../../shared/models/maestra.model';

@Component({
  selector: 'app-filtros-salida',
  templateUrl: './filtros-salida.component.html',
  styleUrls: ['./filtros-salida.component.scss']
})
export class FiltrosSalidaComponent implements OnInit, OnDestroy {

  @Output() filtrar = new EventEmitter<FiltroSalida>();

  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;

  filtrosForm = new FormGroup({
    interfaz: new FormControl(''),
    estado: new FormControl(''),
    genInicio: new FormControl(),
    genFin: new FormControl(),
    readInicio: new FormControl(),
    readFin: new FormControl(),
    nombreArchivo: new FormControl(),
  });

  interfazOptions: Maestra[] = [];
  estadoOptions: Maestra[] = [];

  getInterfacesSub?: Subscription;
  getEstadosSub?: Subscription;

  constructor(
    private salidasService: SalidasService,
  ) { }

  ngOnInit(): void {
    this.getInterfacesSub = this.salidasService.getInterfaces().subscribe(
      interfaces => this.interfazOptions = interfaces,
    );

    this.getEstadosSub = this.salidasService.getEstados().subscribe(
      estados => this.estadoOptions = estados,
    );
  }

  ngOnDestroy(): void {
    this.getInterfacesSub?.unsubscribe();
    this.getEstadosSub?.unsubscribe();
  }

  onFiltrar(): void {
    this.filtrar.emit(this.filtrosForm.value);
    this.panel?.close();
  }

}
