import { EventEmitter, Input, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { EstadosCargaService } from '../../../core/services/estados-carga.service';
import { OrigenService } from '../../../core/services/origen.service';
import { Filtros, Origen, TipoCarga } from '../../../shared';
import { Maestra } from '../../../shared/models/maestra.model';

@Component({
  selector: 'app-filtros-carga',
  templateUrl: './filtros-carga.component.html',
  styleUrls: ['./filtros-carga.component.scss']
})
export class FiltrosCargaComponent implements OnInit, OnDestroy {

  @Input() origen?: string;

  @Output() filtrarCargas = new EventEmitter<Filtros>();

  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;

  filterForm = new FormGroup({
    origen: new FormControl(0),
    estado: new FormControl(''),
    despuesDe: new FormControl(new Date('12/12/2017')),
    antesDe: new FormControl(new Date()),
    jobId: new FormControl(''),
    nombreArchivo: new FormControl(''),
    tipoCarga: new FormControl(''),
  });

  origenOptions: Origen[] = [];
  getOrigenesSub?: Subscription;

  estadoOptions: Maestra[] = [];
  getEstadosSub?: Subscription;

  tipoOptions: Maestra[] = [];

  constructor(
    private origenService: OrigenService,
    private estadosCargaService: EstadosCargaService,
  ) { }

  ngOnInit(): void {
    this.getOrigenesSub = this.origenService.getOrigenes().subscribe(
      origenes => this.origenOptions = origenes,
    );

    this.getEstadosSub = this.estadosCargaService.getEstados().subscribe(
      estados => this.estadoOptions = estados,
    );

    this.getEstadosSub = this.estadosCargaService.getTipoCarga().subscribe(
      tipoCarga => this.tipoOptions = tipoCarga,
    );


    this.filterForm.patchValue({ origen: this.origen || 0 });
  }

  ngOnDestroy(): void {
    this.getOrigenesSub?.unsubscribe();
    this.getEstadosSub?.unsubscribe();
  }

  filter(): void {
    this.filtrarCargas.emit(this.filterForm.value);
    this.panel?.close();
  }

  esHoy(fecha: Date): boolean {
    return moment(fecha).isSame(moment(), 'day');
  }

}
