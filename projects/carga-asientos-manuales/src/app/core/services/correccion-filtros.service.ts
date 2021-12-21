import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CorreccionFiltro } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class CorreccionFiltrosService {

  filtros: CorreccionFiltro[] = [];

  filtrosSubject: Subject<CorreccionFiltro[]> = new Subject();

  constructor() { }

  getFiltros(): Observable<CorreccionFiltro[]> {
    return this.filtrosSubject.asObservable();
  }

  addFiltro(filtro: CorreccionFiltro): void {
    this.filtros.push(filtro);
    this.filtrosSubject.next(this.filtros);
  }

  removeFiltro(filtro: CorreccionFiltro): void {
    this.filtros = this.filtros.filter(f => f !== filtro);
    this.filtrosSubject.next(this.filtros);
  }

  editFiltro(filtro: CorreccionFiltro): void {
    this.filtros = this.filtros.map(f => f.columna === filtro.columna ? filtro : f);
    this.filtrosSubject.next(this.filtros);
  }
}
