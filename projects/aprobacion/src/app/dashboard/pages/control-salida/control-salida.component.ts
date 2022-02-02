import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SalidasService } from 'src/app/core/services/salidas.service';
import { FiltroSalida, Salida } from 'src/app/shared';

@Component({
  selector: 'app-control-salida',
  templateUrl: './control-salida.component.html',
  styleUrls: ['./control-salida.component.scss']
})
export class ControlSalidaComponent implements OnInit, OnDestroy {

  salidas: Salida[] = [];

  loadingSalidas: boolean = false;

  getSalidasSub?: Subscription;

  constructor(
    private salidasService: SalidasService,
  ) { }

  ngOnInit(): void {
    this.filtrar({
      interfaz: '',
      estado: '',
      genInicio: new Date(),
      genFin: new Date(),
      readInicio: new Date(),
      readFin: new Date(),
      nombreArchivo: '',
    });
  }

  ngOnDestroy(): void {
    this.getSalidasSub?.unsubscribe();
  }

  filtrar(filtroSalida: FiltroSalida): void {
    this.loadingSalidas = true;

    this.getSalidasSub = this.salidasService.getSalidas(
      filtroSalida.interfaz,
      filtroSalida.estado,
      filtroSalida.genInicio,
      filtroSalida.genFin,
      filtroSalida.readInicio,
      filtroSalida.readFin,
      filtroSalida.nombreArchivo,
    ).subscribe(
      salidas => this.salidas = salidas,
      error => console.log(error),
      () => this.loadingSalidas = false,
    );
  }

}
