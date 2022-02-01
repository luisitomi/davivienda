import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { Sincronizacion } from 'src/app/shared';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SincronizacionesService {

  syncsEndpoint: string = '/sincronizaciones';
  estadosEndpoint: string = '/estados-sincronizacion';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getSincronizaciones(
    proceso: string = '',
    estado: string = '',
    readInicio: Date,
    readFin: Date,
  ): Observable<Sincronizacion[]> {
    let params = new HttpParams()
      .set('proceso-sincronizacion', proceso)
      .set('estado', estado)
      .set('fecha-lectura-inicio', moment(readInicio).toISOString())
      .set('fecha-lectura-fin', moment(readFin).toISOString());

    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Sincronizacion[]>(url + this.syncsEndpoint, { params })),
    );
  }

  getEstados(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.estadosEndpoint)),
    );
  }

}
