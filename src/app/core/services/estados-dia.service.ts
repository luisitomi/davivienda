import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoDia } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class EstadosDiaService {

  estados: EstadoDia[] = [
    { id: 1, fecha: moment().toDate(), estado: 'Abierto', fechaCierre: moment().toDate(), ejecutor: 'LMORAN' },
    { id: 2, fecha: moment().subtract(1, 'day').toDate(), estado: 'Cerrado', fechaCierre: moment().subtract(1, 'day').toDate(), ejecutor: 'LMORAN' },
    { id: 3, fecha: moment().subtract(2, 'day').toDate(), estado: 'Cerrado', fechaCierre: moment().subtract(2, 'day').toDate(), ejecutor: 'JGUILLEN' },
    { id: 4, fecha: moment().subtract(3, 'day').toDate(), estado: 'Cerrado', fechaCierre: moment().subtract(3, 'day').toDate(), ejecutor: 'MROSAS' },
    { id: 5, fecha: moment().subtract(4, 'day').toDate(), estado: 'Cerrado', fechaCierre: moment().subtract(4, 'day').toDate(), ejecutor: 'SCHAGUA' },
  ];

  estadosSubject = new BehaviorSubject<EstadoDia[]>(this.estados);

  constructor() { }

  getEstados(inicio: Date, fin: Date): Observable<EstadoDia[]> {
    return this.estadosSubject.asObservable().pipe(
      map(estados => estados.filter(f => moment(f.fecha).isBetween(inicio, fin, 'day', '[]'))),
    );
  }

  cerrarDia(id: number): void {
    this.estados = this.estados.map(e => e.id === id ? { ...e, estado: 'Cerrado' } : e);
    this.estadosSubject.next(this.estados);
  }
}
