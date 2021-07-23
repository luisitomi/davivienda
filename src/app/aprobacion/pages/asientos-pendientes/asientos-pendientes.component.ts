import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Asiento } from 'src/app/shared';
import { FiltroAsiento } from '../../models/filtro-asiento.model';
import { AsientosService } from '../../services/asientos.service';

@Component({
  selector: 'app-asientos-pendientes',
  templateUrl: './asientos-pendientes.component.html',
  styleUrls: ['./asientos-pendientes.component.scss']
})
export class AsientosPendientesComponent implements OnInit, OnDestroy {

  asientos: Asiento[] = [];

  getAsientosSub?: Subscription;
  aprobarSub?: Subscription;
  rechazarSub?: Subscription;

  loadingAsientos: boolean = false;

  filtros: FiltroAsiento = {
    inicio: undefined,
    fin: undefined,
    origen: '',
    usuario: '',
    estado: '',
    cuenta: '',
  };

  constructor(
    private asientosService: AsientosService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.filtrar(this.filtros);
  }

  ngOnDestroy(): void {
    this.getAsientosSub?.unsubscribe();
    this.aprobarSub?.unsubscribe();
    this.rechazarSub?.unsubscribe();
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

  aprobar(asientos: Asiento[]): void {
    this.aprobarSub = this.asientosService.aprobar(asientos.map(a => a.id)).subscribe(
      ok => {
        this.openSnackBar('Asientos aprobados');
        this.filtrar(this.filtros);
      },
    );
  }

  rechazar(asientos: Asiento[]): void {
    this.rechazarSub = this.asientosService.rechazar(asientos.map(a => a.id)).subscribe(
      ok => {
        this.openSnackBar('Asientos rechazados');
        this.filtrar(this.filtros);
      },
    );
  }

  openSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

}
