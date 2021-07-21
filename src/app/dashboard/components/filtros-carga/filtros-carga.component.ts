import { EventEmitter, Input, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { OrigenService } from 'src/app/core/services/origen.service';
import { Estados, Filtros, Origen, TipoCarga } from 'src/app/shared';

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
    origen: new FormControl(''),
    estado: new FormControl(''),
    despuesDe: new FormControl(new Date()),
    antesDe: new FormControl(new Date()),
    jobId: new FormControl(''),
    nombreArchivo: new FormControl(''),
    tipoCarga: new FormControl(''),
  });

  origenOptions: string[]= [];
  getOrigenesSub?: Subscription;

  estadoOptions = Estados;

  tipoOptions = TipoCarga;

  constructor(
    public origenService: OrigenService,
  ) { }

  ngOnInit(): void {
    this.getOrigenesSub = this.origenService.getOrigenes().subscribe(
      origenes => this.origenOptions = origenes,
    );

    this.filterForm.patchValue({ origen: this.origen || '' });
  }

  ngOnDestroy(): void {
    this.getOrigenesSub?.unsubscribe();
  }

  filter(): void {
    this.filtrarCargas.emit(this.filterForm.value);
    this.panel?.close();
  }

  esHoy(fecha: Date): boolean {
    return moment(fecha).isSame(moment(), 'day');
  }

}
