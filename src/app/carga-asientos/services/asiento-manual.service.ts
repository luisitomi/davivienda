import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CabeceraAsiento, Linea, ReferenciaComplementaria, ResultadoCarga } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class AsientoManualService {

  url: string = 'http://urldelservidor.com/api/v1.0/nuevo-asiento-manual';
  urlCarga: string = 'http://urldelservidor.com/api/v1.0/carga-asientos-manual';

  private cabecera = new BehaviorSubject<CabeceraAsiento | undefined>(undefined);
  private lineas: Linea[] = [];
  private lineasSubject: BehaviorSubject<Linea[]> = new BehaviorSubject(this.lineas);

  constructor(
    private http: HttpClient,
  ) { }

  grabarAsiento(): Observable<any> {
    let asiento = { cabecera: this.cabecera.value!!, lineas: this.lineas };
    return this.http.post<any>(this.url, { body: { asiento } });
  }

  getCabecera(): Observable<CabeceraAsiento | undefined> {
    return this.cabecera.asObservable();
  }

  setCabecera(cabecera: CabeceraAsiento): void {
    this.cabecera.next(cabecera);
  }

  getLineas(): Observable<Linea[]> {
    return this.lineasSubject.asObservable();
  }

  hayLineas(): Observable<boolean> {
    return this.lineasSubject.asObservable().pipe(
      map(lineas => lineas.length > 0),
    );
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
      tap(r => console.log(r)),
    );
  }

  addReferencia(lineaIndex: number, referencia: ReferenciaComplementaria): void {
    let linea = this.lineas.find(l => l.index === lineaIndex);

    linea?.columnasReferenciales.push({ ...referencia, index: linea.columnasReferenciales.length + 1 });

    this.lineas = this.lineas.map(l => l.index === linea?.index ? linea : l);
    this.lineasSubject.next(this.lineas);
  }

  editReferencia(lineaIndex: number, referencia: ReferenciaComplementaria): void {
    let linea = this.lineas.find(l => l.index === lineaIndex);

    if (linea !== undefined) {
      linea.columnasReferenciales = linea.columnasReferenciales.map(r => r.index === referencia.index ? referencia : r);
    }

    this.lineas = this.lineas.map(l => l.index === linea?.index ? linea : l);
    this.lineasSubject.next(this.lineas);
  }

  removeReferencia(lineaIndex: number, referencia: ReferenciaComplementaria): void {
    let linea = this.lineas.find(l => l.index === lineaIndex);

    if(linea !== undefined) {
      linea.columnasReferenciales = linea.columnasReferenciales.filter(r => r.index !== referencia.index)
        .sort((a, b) => a.index > b.index ? 1 : -1)
        .map((r, i) => ({ ...r, index: i + 1 }));

        this.lineas = this.lineas.map(l => l.index === lineaIndex ? linea!! : l);
    }

    this.lineasSubject.next(this.lineas);
  }

  cargarAsientos(file: any): Observable<ResultadoCarga> {
    let formData = new FormData();
    formData.append('archivo', file);
    return this.http.post<ResultadoCarga>(this.urlCarga, formData);
  }

}
