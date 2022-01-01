import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { ConfigService } from '../../core/services/config.service';
import { CabeceraAsiento, ResultadoCarga } from '../../shared';
import { CabeceraAsientoInsert } from '../../shared/models/cabecera-asiento-insert.model';
import { LineaAsientoInsert } from '../../shared/models/linea-asiento-insert.model';

import { Linea } from '../models/linea.model';
import { ReferenciaComplementaria } from '../models/referencia-complementaria.model';

@Injectable({
  providedIn: 'root'
})
export class AsientoManualService {

  asientoEndpoint: string = '/nuevo-asiento-manual';
  cargaEndpoint: string = '/carga-asientos-manual';

  TsInsertCargaAsientoHeaderWS = "/workflows/13ec2ad953d54747b5e3abe9458bfe73/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dJthuoBOIxc7kmMppdAn_0NkWFJJl4HIqd7QwdZOlwg";
  TsInsertCargaAsientoLinesWS  = "/workflows/3342ba056cd94ae99567af0a5450a6e9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=aDXd0eUl0QFKktfBwHRstijYMTDENU-0X91xRQfaoOQ";
  private idCabecera = 0;
  private cabecera = new BehaviorSubject<CabeceraAsiento | undefined>(undefined);
  private lineas: Linea[] = [];
  private lineasSubject: BehaviorSubject<Linea[]> = new BehaviorSubject(this.lineas);

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  setIdCabecera(idCabecera: number) {
    this.idCabecera = idCabecera;
  }
  getIdCabecera() {
    return this.idCabecera;
  }
  grabarAsiento(): Observable<any> {
    let asiento = { cabecera: this.cabecera.value!!, lineas: this.lineas };
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url + this.asientoEndpoint ,{ body: asiento })),
    );
  }
  grabarAsientoCabecera(prmBean: CabeceraAsientoInsert): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url + this.TsInsertCargaAsientoHeaderWS ,prmBean)),
    );
  }


  grabarAsientoLinea(prmBean: any): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url + this.TsInsertCargaAsientoLinesWS ,prmBean)),
    );
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

  onSaveLinea(linea: Linea): void {

    let lineaAsiento = new LineaAsientoInsert();
    lineaAsiento.Id = this.getIdCabecera();
    lineaAsiento.nroLinea= linea.index;

  lineaAsiento.combinationAccount= undefined;
  lineaAsiento.SegCurrency= linea.moneda;
  lineaAsiento.EnteredDebit= (linea.debito == null ? "" : linea.debito.toString() );
  lineaAsiento.EnteredCredit= (linea.credito == null ? "" : linea.credito.toString() );
  lineaAsiento.Description= "";
  lineaAsiento.Usuario= "";

    this.grabarAsientoLinea(lineaAsiento).subscribe(res => {
      console.log(res)
    });
  }

  addLinea(linea: Linea): void {
    let indexLinea = this.lineas.length + 1
    linea.index = indexLinea;
    //this.onSaveLinea();
    this.lineas.push({ ...linea, index: indexLinea });
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

  setCombinacionContable(lineaIndex: number, combinacionContable: string): void {
    let linea = this.lineas.find(l => l.index === lineaIndex);
    if (linea) {
      linea.combinacionContable = combinacionContable;
    }
  }

  setCombinacionContableV2(
      lineaIndex: number
    , combinacionContable: string
    , compania: string
    , cuentacontable: string
    , oficina: string
    , sucursal: string  
    , proyecto: string
    , subproyecto: string
    , tipocomprobante: string
    , intecompania: string
    , vinculado: string
    , futuro1: string
    , futuro2: string
    , requiereIdentificacionCliente: string
    , requiereAuxiliarConciliacion: string
    ): void {
    let linea = this.lineas.find(l => l.index === lineaIndex);
    if (linea) {
      linea.combinacionContable = combinacionContable;
      linea.compania = compania;
      linea.cuentaContable = cuentacontable;
      linea.oficina = oficina;
      linea.sucursal = sucursal;
      linea.proyecto = proyecto;
      linea.subproyecto = subproyecto;
      linea.tipoComprobante = tipocomprobante;
      linea.intecompania = intecompania;
      linea.vinculado = vinculado;
      linea.futuro1 = futuro1;
      linea.futuro2 = futuro2;
      linea.requiereIdentificacionCliente = requiereIdentificacionCliente;
      linea.requiereAuxiliarConciliacion = requiereAuxiliarConciliacion;
    }
  }

  getCombinacionContable(linea: number): Observable<string | undefined> {
    return this.lineasSubject.asObservable().pipe(
      map(lineas => lineas.find(l => l.index === linea)?.combinacionContable),
    );
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
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<ResultadoCarga>(url + this.cargaEndpoint, formData)),
    );
  }

  clear(): void {
    this.cabecera.next(undefined);
    this.lineas = [];
  }

}
