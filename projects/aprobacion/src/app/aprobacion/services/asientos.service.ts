import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { Asiento } from 'src/app/shared';
import { FiltroAsiento } from '../models/filtro-asiento.model';
import { ResultadoEnvio } from '../models/resultado-envio.response';

@Injectable({
  providedIn: 'root'
})
export class AsientosService {

  endpoint: string = '/asientos';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getAsientos(filtros: FiltroAsiento): Observable<Asiento[]> {
    const params = new HttpParams()
      .set('inicio', moment(filtros.inicio).toISOString())
      .set('fin', moment(filtros.fin).toISOString())
      .set('origen', filtros.origen)
      .set('usuario', filtros.usuario)
      .set('estado', filtros.estado)

    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Asiento[]>(url + this.endpoint, { params })),
    );
  }

  getAsientoPorId(id: number, agrupadox6: boolean = false): Observable<Asiento> {
    let params = new HttpParams()
      .set('agrupadox6', agrupadox6);
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Asiento>(url + this.endpoint + '/' + id, { params })),
    );
  }

  aprobar(asientos: number[]): Observable<boolean> {
    let body = { accion: 'aprobar', asientos };

    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<ResultadoEnvio>(url + this.endpoint, body)),
      map(res => true),
    );
  }

  rechazar(asientos: number[]): Observable<boolean> {
    let body = { accion: 'rechazar', asientos };

    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<ResultadoEnvio>(url + this.endpoint, body)),
      map(res => true),
    );
  }
}
