import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SincronizacionesService } from 'src/app/core/services/sincronizaciones.service';
import { FiltroSincronizacion } from 'src/app/shared';
import { Sincronizacion } from 'src/app/shared';

@Component({
  selector: 'app-control-sincronizaciones',
  templateUrl: './control-sincronizaciones.component.html',
  styleUrls: ['./control-sincronizaciones.component.scss']
})
export class ControlSincronizacionesComponent implements OnInit, OnDestroy {

  sincronizaciones: Sincronizacion[] = [];

  getSyncsSub?: Subscription;

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
    this.getSyncsSub = this.sincronizacionesService.getSincronizaciones(
      filtroSync.proceso,
      filtroSync.estado,
      filtroSync.readInicio,
      filtroSync.readFin,
    ).subscribe(
      syncs => this.sincronizaciones = syncs,
    );
  }

}
