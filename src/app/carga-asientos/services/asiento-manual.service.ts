import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Linea, ReferenciaComplementaria } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class AsientoManualService {

  private lineas: Linea[] = [];
  private lineasSubject: Subject<Linea[]> = new Subject();

  constructor(
    private http: HttpClient,
  ) { }

  getLineas(): Observable<Linea[]> {
    return this.lineasSubject.asObservable();
  }

  addLinea(linea: Linea): void {
    this.lineas.push({ ...linea, index: this.lineas.length + 1 });
    this.lineasSubject.next(this.lineas);
  }

  editLinea(linea: Linea): void {
    this.lineas = this.lineas.map(l => l.index === linea.index ? linea : l);
    this.lineasSubject.next(this.lineas);
  }

  removeLinea(linea: Linea): void {
    this.lineas = this.lineas.filter(l => l.index !== linea.index)
      .sort((a, b) => a.index > b.index ? 1 : -1)
      .map((l, i) => ({ ...l, index: i + 1 }));
    this.lineasSubject.next(this.lineas);
  }

  getReferencias(index: number): Observable<ReferenciaComplementaria[] | undefined> {
    return this.lineasSubject.asObservable().pipe(
      map(lineas => lineas.find(l => l.index === index)?.columnasReferenciales),
    );
  }
}
