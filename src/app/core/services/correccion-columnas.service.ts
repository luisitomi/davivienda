import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CorreccionColumna } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class CorreccionColumnasService {

  columnas: CorreccionColumna[] = [];

  columnasSubject: Subject<CorreccionColumna[]> = new Subject();

  constructor() { }

  getColumnas(): Observable<CorreccionColumna[]> {
    return this.columnasSubject.asObservable();
  }

  addColumna(columna: CorreccionColumna): void {
    this.columnas.push(columna);
    this.columnasSubject.next(this.columnas);
  }

  removeColumna(columna: CorreccionColumna): void {
    this.columnas = this.columnas.filter(c => c !== columna);
    this.columnasSubject.next(this.columnas);
  }

  editColumna(columna: CorreccionColumna): void {
    this.columnas = this.columnas.map(c => c.columna === columna.columna ? columna : c);
    this.columnasSubject.next(this.columnas);
  }
}
