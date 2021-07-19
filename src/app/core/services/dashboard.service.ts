import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoletGlobal, InfoletOrigen } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  infoletOrigen: InfoletOrigen = {
    origen: 'COBIS',
    estado: 'En proceso',
    archivosProcesados: 4,
    transaccionesCargadas: 13000,
    asientosAccountingHub: 12000,
    asientosGeneralAccounting: 1000,
    movimientoNetoHoy: 12000000,
    movimientoNetoAyer: 14000000,
    variacion: 12.54,
  };

  infoletGlobal: InfoletGlobal = {
    archivosProcesados: 6,
    transaccionesCargadas: 50000,
    asientosAccountingHub: 50000,
    asientosGeneralAccounting: 5000,
    movimientoNetoHoy: 34546908,
    movimientoNetoAyer: 43567450,
    variacion: -21.45,
  };

  constructor() { }

  getInfoletOrigen(): Observable<InfoletOrigen> {
    return new Observable<InfoletOrigen>(subscriber => {
      subscriber.next(this.infoletOrigen);
    });
  }

  getInfoletGlobal(): Observable<InfoletGlobal> {
    return new Observable<InfoletGlobal>(subscriber => {
      subscriber.next(this.infoletGlobal);
    });
  }
}
