import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Salida } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class SalidasService {

  url = 'http://rutadelservidor.com/api/v1.0/salidas';

  constructor(
    private http: HttpClient,
  ) { }

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

    return this.http.get<Salida[]>(this.url, { params: params });
  }
}
