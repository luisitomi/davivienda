import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { Buscar } from '../models/buscar.model';
import { Filtro } from '../models/filtro.model';
import { ResultadoCargaFiltros } from '../models/resultado-carga-filtros.model';

@Injectable({
  providedIn: 'root'
})
export class FiltrosOdiService {

  fuenteEndpoint: string = '/fuentes-filtro';
  tipoEndpoint: string = '/tipos-filtro';
  campoEndpoint: string = '/campos-filtro';
  filtroEndpoint: string = '/filtros-odi';
  cargaEndpoint: string = '/carga-filtros-odi';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getFuentes(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.fuenteEndpoint)),
    );
  }

  getTipos(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.tipoEndpoint)),
    );
  }

  getCampos(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.campoEndpoint)),
    );
  }

  getFiltros(criterios: Buscar): Observable<Filtro[]> {
    let params = new HttpParams()
      .set('fuente', criterios.fuente)
      .set('valores', criterios.valores)
      .set('tipo', criterios.tipo)
      .set('campo', criterios.campo);

    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Filtro[]>(url + this.filtroEndpoint, { params })),
      map(filtros => filtros.map(f => ({ ...f, oldFuente: f.fuente, oldValores: f.valores, oldTipo: f.tipo, oldCampo: f.campo })))
    );
  }

  guardarFiltros(filtros: Filtro[]): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.put<any>(url + this.filtroEndpoint, filtros)),
      map(res => true),
    );
  }

  nuevoFiltro(filtro: Filtro): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url + this.filtroEndpoint, filtro)),
      map(res => true),
    );
  }

  eliminarFiltro(filtro: Filtro): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.delete<any>(url + this.filtroEndpoint + '/' + filtro.id)),
      map(res => true),
    );
  }

  cargarFiltros(file: any): Observable<ResultadoCargaFiltros> {
    let formData = new FormData();
    formData.append('archivo', file);
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<ResultadoCargaFiltros>(url + this.cargaEndpoint, formData)),
    );
  }

}
