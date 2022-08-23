import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SalidasService } from '../../../core/services/salidas.service';

import { FiltroSalida, Salida } from '../../../shared';


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


    this.salidasService.postAnticsrf().subscribe(rest=> {
      console.log('rest:')
      console.log(rest)

    });
    /*this.filtrar({
      interfaz: '',
      estado: '',
      genInicio: new Date(),
      genFin: new Date(),
      readInicio: new Date(),
      readFin: new Date(),
      nombreArchivo: '',
    }); */
  }

  ngOnDestroy(): void {
    this.getSalidasSub?.unsubscribe();
  }

  filtrar(filtroSalida: FiltroSalida): void {
    this.loadingSalidas = true;

    let fechaInicio = "";
let fechaFin ="";
    if (filtroSalida.genInicio != null) {
      let day = filtroSalida.genInicio.getDate();
      let month = filtroSalida.genInicio.getMonth() + 1;
      let year = filtroSalida.genInicio.getFullYear();

      if (month < 10) {
        fechaInicio = `${day}/0${month}/${year}`;
      } else {
        fechaInicio = `${day}/${month}/${year}`;
      }
    } else {
      fechaInicio = "01/01/2020";
    }

    if (filtroSalida.genFin != null) {
      let day = filtroSalida.genFin.getDate();
      let month = filtroSalida.genFin.getMonth() + 1;
      let year = filtroSalida.genFin.getFullYear();

      if (month < 10) {
        fechaFin = `${day}/0${month}/${year}`;
      } else {
        fechaFin = `${day}/${month}/${year}`;
      }
    } else {
      fechaFin = "01/01/2050";
    }

    const prmBean = {
      Estado:filtroSalida.estado,
      InterfazSalida:filtroSalida.interfaz,
      NombreArchivo:filtroSalida.nombreArchivo,
      FechaInicio:fechaInicio,
      FechaFin:fechaFin
    };

    this.getSalidasSub = this.salidasService.postSalidas(
      prmBean
    ).subscribe(
      salidas => this.salidas = salidas,
      error => console.log(error),
      () => this.loadingSalidas = false,
    );
  }






}
