import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CargasService } from 'src/app/core/services/cargas.service';
import { Carga, Filtros } from 'src/app/shared';

@Component({
  selector: 'app-control-monitoreo',
  templateUrl: './control-monitoreo.component.html',
  styleUrls: ['./control-monitoreo.component.scss']
})
export class ControlMonitoreoComponent implements OnInit, OnDestroy {

  cargas: Carga[] = [];

  getCargasSub?: Subscription;

  constructor(
    private cargasService: CargasService,
  ) { }

  ngOnInit(): void {
    this.getCargasSub = this.cargasService.getCargas().subscribe(
      data => this.cargas = data,
    );
  }

  ngOnDestroy(): void {
    this.getCargasSub?.unsubscribe;
  }

  filtrarCargas(filtros: Filtros): void {
    this.getCargasSub = this.cargasService.getCargas(filtros.origen, null, '', filtros.estado).subscribe(
      data => this.cargas = data,
    );
  }

}
