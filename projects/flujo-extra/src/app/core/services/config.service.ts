import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  TsFAHCierreDiarioList = this.enviroment.TsFAHCierreDiarioList?.replace(
    /\/$/,
    ''
  );
  listadoPre = this.enviroment.TSFAHCierreDiarioSave?.replace(
    /\/$/,
    ''
  );
  cierre = this.enviroment.TSFAHCierreDiarioUpdate?.replace(
    /\/$/,
    ''
  );
  TsFahObtenerUsuarioWS = this.enviroment.TsFahObtenerUsuarioWS?.replace(
    /\/$/,
    ''
  );
  listadoUrlSubject: BehaviorSubject<string> = new BehaviorSubject(this.TsFAHCierreDiarioList);
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
