import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SincronizacionesService } from '../../../core/services/sincronizaciones.service';
import { FiltroSincronizacion, Sincronizacion } from '../../../shared';


@Component({
  selector: 'app-control-sincronizaciones',
  templateUrl: './control-sincronizaciones.component.html',
  styleUrls: ['./control-sincronizaciones.component.scss']
})
export class ControlSincronizacionesComponent implements OnInit, OnDestroy {

  sincronizaciones: Sincronizacion[] = [];

  getSyncsSub?: Subscription;

  loadingSyncs: boolean = false;

  constructor(
    private sincronizacionesService: SincronizacionesService,
  ) { }

  ngOnInit(): void {
    this.filtrar({
      proceso: '',
      estado: '',
      readInicio: new Date(),
      readFin: new Date(),
    });
  }

  ngOnDestroy(): void {
    this.getSyncsSub?.unsubscribe();
  }

  filtrar(filtroSync: FiltroSincronizacion): void {
    this.loadingSyncs = true;
    this.getSyncsSub = this.sincronizacionesService.getSincronizaciones(
      filtroSync.proceso,
      filtroSync.estado,
      filtroSync.readInicio,
      filtroSync.readFin,
    ).subscribe(
      syncs => this.sincronizaciones = syncs,
      error => console.log(error),
      () => this.loadingSyncs = false,
    );
  }

}
