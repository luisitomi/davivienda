import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  listado = this.enviroment.listado?.replace(
    /\/$/,
    ''
  );
  listadoPre = this.enviroment.listadoPre?.replace(
    /\/$/,
    ''
  );
  cierre = this.enviroment.cierre?.replace(
    /\/$/,
    ''
  );
  TsFahObtenerUsuarioWS = this.enviroment.TsFahObtenerUsuarioWS?.replace(
    /\/$/,
    ''
  );
  listadoUrlSubject: BehaviorSubject<string> = new BehaviorSubject(this.listado);
  cierreUrlSubject: BehaviorSubject<string> = new BehaviorSubject(this.cierre);
  TsFahObtenerUsuarioWSUrlSubject: BehaviorSubject<string> = new BehaviorSubject(this.TsFahObtenerUsuarioWS);
  listadoPreUrlSubject: BehaviorSubject<string> = new BehaviorSubject(this.listadoPre);

  constructor(
    private enviroment: ApiService
  ) { }

  getApiUrlListado(): Observable<string> {
    return this.listadoUrlSubject.asObservable().pipe(first());
  }

  getApiUrlListadoPre(): Observable<string> {
    return this.listadoPreUrlSubject.asObservable().pipe(first());
  }

  getApiUrlCierre(): Observable<string> {
    return this.cierreUrlSubject.asObservable().pipe(first());
  }

  getApiUrlTsFahObtenerUsuarioWS(): Observable<string> {
    return this.TsFahObtenerUsuarioWSUrlSubject.asObservable().pipe(first());
  }
}
