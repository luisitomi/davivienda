import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Asiento } from 'src/app/shared';
import { FiltroAsiento } from '../../models/filtro-asiento.model';
import { AsientosService } from '../../services/asientos.service';

@Component({
  selector: 'app-asientos-pendientes',
  templateUrl: './asientos-pendientes.component.html',
  styleUrls: ['./asientos-pendientes.component.scss']
})
export class AsientosPendientesComponent implements OnInit {

  asientos: Asiento[] = [];

  getAsientosSub?: Subscription;

  loadingAsientos: boolean = false;

  constructor(
    private asientosService: AsientosService,
  ) { }

  ngOnInit(): void {
    this.filtrar({
      inicio: undefined,
      fin: undefined,
      origen: '',
      usuario: '',
      estado: '',
      cuenta: '',
    });
  }

  filtrar(filtros: FiltroAsiento): void {
    this.loadingAsientos = true;
    this.getAsientosSub = this.asientosService.getAsientos(filtros).subscribe(
      asientos => {
        this.asientos = asientos;
        this.loadingAsientos = false;
      },
      error => console.log(error),
      () => this.loadingAsientos = false,
    );
  }

}
