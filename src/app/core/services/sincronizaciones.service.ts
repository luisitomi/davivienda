import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Sincronizacion } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class SincronizacionesService {

  url: string = 'https://rutadelservidor.com/api/v1.0/sincronizaciones';

  constructor(
    private http: HttpClient,
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

    return this.http.get<Sincronizacion[]>(this.url, { params: params });
  }
}
