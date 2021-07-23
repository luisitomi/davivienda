import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { Salida } from 'src/app/shared';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SalidasService {

  salidaEndpoint: string = '/salidas';
  interfazEndpoint: string = '/interfaces';
  estadosEndpoint: string = '/estados-salida';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getInterfaces(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.interfazEndpoint)),
    );
  }

  getEstados(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.estadosEndpoint)),
    );
  }

  getSalidas(
    interfaz: string = '',
    estado: string = '',
    fechaGenInicio: Date,
    fechaGenFin: Date,
    fechaReadInicio: Date,
    fechaReadFin: Date,
    nombreArchivo: string = '',
  ): Observable<Salida[]> {
    let params = new HttpParams()
      .set('interfaz', interfaz)
      .set('estado', estado)
      .set('fecha-inicio-generacion', moment(fechaGenInicio).toISOString())
      .set('fecha-fin-generacion', moment(fechaGenFin).toISOString())
      .set('fecha-inicio-lectura', moment(fechaReadInicio).toISOString())
      .set('fecha-fin-lectura', moment(fechaReadFin).toISOString())
      .set('nombre-archivo', nombreArchivo);

    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Salida[]>(url + this.salidaEndpoint, { params })),
    );
  }

}
