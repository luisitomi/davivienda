import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carga } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class CargasService {

  cargas: Carga[] = [
    { fecha: new Date(), origen: 'CAS', nombreArchivo: 'prueba.XML', estado: 'Procesado', reversado: 'Error', jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
    { fecha: new Date(), origen: 'UML', nombreArchivo: 'prueba1.XML', estado: 'Error funcional', reversado: 'Si', jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
    { fecha: new Date(), origen: 'EVOL', nombreArchivo: 'prueba2.XML', estado: 'Error tecnico', reversado: 'No', jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
    { fecha: new Date(), origen: 'PAS', nombreArchivo: 'prueba3.XML', estado: 'Procesado', reversado: 'No', jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
    { fecha: new Date(), origen: 'DEL', nombreArchivo: 'prueba4.XML', estado: 'Procesado', reversado: 'Si', jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
  ]

  constructor() { }

  getCargas(): Observable<Carga[]> {
    return new Observable<Carga[]>(subscriber => {
      subscriber.next(this.cargas);
    });
  }
}
