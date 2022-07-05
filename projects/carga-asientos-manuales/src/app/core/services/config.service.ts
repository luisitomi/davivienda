import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl = this.enviroment.apiUrl?.replace(
    /\/$/,
    ''
  );
  TsFahObtenerUsuarioWS = this.enviroment.TsFahObtenerUsuarioWS?.replace(
    /\/$/,
    ''
  );
  getOptions2 = this.enviroment.TsFahGetCuentaContableWS?.replace(
    /\/$/,
    ''
  );
  getParte1 = this.enviroment.TsFahGetCompaniaWS?.replace(
    /\/$/,
    ''
  );
  getOptions3 = this.enviroment.TsFahGetOficinaWS?.replace(
    /\/$/,
    ''
  );
  getOptions4 = this.enviroment.TsFahGetSucursalWS?.replace(
    /\/$/,
    ''
  );
  getOptions5 = this.enviroment.TsFahGetProyectoWS?.replace(
    /\/$/,
    ''
  );
  getOptions6 = this.enviroment.TsFahGetSubproyectoWS?.replace(
    /\/$/,
    ''
  );
  getOptions7 = this.enviroment.TsFahGetTipoComprobanteWS?.replace(
    /\/$/,
    ''
  );
  getOptions8 = this.enviroment.TsFahGetIntercompaniaWS?.replace(
    /\/$/,
    ''
  );
  getOptions9 = this.enviroment.TsFahGetVinculadoWS?.replace(
    /\/$/,
    ''
  );
  getOptions10 = this.enviroment.TsFahGetFuturo1WS?.replace(
    /\/$/,
    ''
  );
  getOptions11 = this.enviroment.TsFahGetFuturo2WS?.replace(
    /\/$/,
    ''
  );
  TsFAHCuurencyMoney = this.enviroment.TsFAHCuurencyMoney?.replace(
    /\/$/,
    ''
  );
  validateCliente360 = this.enviroment.TsGetPersona360PornumeroIDWS?.replace(
    /\/$/,
    ''
  );
  ListReference = this.enviroment.TsFahColumnaODICargaAsientoManualWS?.replace(
    /\/$/,
    ''
  );
  urlOrigen = this.enviroment.TsFAHOrigenCargaContableWS?.replace(
    /\/$/,
    ''
  );
  ListPeriod = this.enviroment.TsFahPeriodoAllWS?.replace(
    /\/$/,
    ''
  );
  getLeader = this.enviroment.TsFahOperationUnitWS?.replace(
    /\/$/,
    ''
  );
  cargarAsientos = this.enviroment.TsFahCargaAsientosCSVWS?.replace(
    /\/$/,
    ''
  );
  saveHeaderLine = this.enviroment.TsCargaAsientoManualSaveWS?.replace(
    /\/$/,
    ''
  );
  TsFahGetSegmentosWS = this.enviroment.TsFahGetSegmentosWS?.replace(
    /\/$/,
    ''
  );
  TsFahValidacionFechaCerradaGLWS = this.enviroment.TsFahValidacionFechaCerradaGLWS?.replace(
    /\/$/,
    ''
  );
  apiUrlSubject: BehaviorSubject<string> = new BehaviorSubject(this.apiUrl);
  _getOptions2: BehaviorSubject<string> = new BehaviorSubject(this.getOptions2);
  _getOptions1: BehaviorSubject<string> = new BehaviorSubject(this.getParte1);
  _getOptions3: BehaviorSubject<string> = new BehaviorSubject(this.getOptions3);
  _getOptions4: BehaviorSubject<string> = new BehaviorSubject(this.getOptions4);
  _getOptions5: BehaviorSubject<string> = new BehaviorSubject(this.getOptions5);
  _getOptions6: BehaviorSubject<string> = new BehaviorSubject(this.getOptions6);
  _getOptions7: BehaviorSubject<string> = new BehaviorSubject(this.getOptions7);
  _getOptions8: BehaviorSubject<string> = new BehaviorSubject(this.getOptions8);
  _getOptions9: BehaviorSubject<string> = new BehaviorSubject(this.getOptions9);
  _getOptions10: BehaviorSubject<string> = new BehaviorSubject(this.getOptions10);
  _getOptions11: BehaviorSubject<string> = new BehaviorSubject(this.getOptions11);
  _TsFAHCuurencyMoney: BehaviorSubject<string> = new BehaviorSubject(this.TsFAHCuurencyMoney);
  _validateCliente360: BehaviorSubject<string> = new BehaviorSubject(this.validateCliente360);
  _ListReference: BehaviorSubject<string> = new BehaviorSubject(this.ListReference);
  _urlOrigen: BehaviorSubject<string> = new BehaviorSubject(this.urlOrigen);
  _ListPeriod: BehaviorSubject<string> = new BehaviorSubject(this.ListPeriod);
  _getLeader: BehaviorSubject<string> = new BehaviorSubject(this.getLeader);
  _cargarAsientos: BehaviorSubject<string> = new BehaviorSubject(this.cargarAsientos);
  _saveHeaderLine: BehaviorSubject<string> = new BehaviorSubject(this.saveHeaderLine);
  _TsFahGetSegmentosWS: BehaviorSubject<string> = new BehaviorSubject(this.TsFahGetSegmentosWS);
  _TsFahValidacionFechaCerradaGLWS: BehaviorSubject<string> = new BehaviorSubject(this.TsFahValidacionFechaCerradaGLWS);
  constructor(
    private enviroment: ApiService
  ) { }

  getApiUrl(): Observable<string> {
    return this.apiUrlSubject.asObservable().pipe(first());
  }

  getApiUrlgetOptions2(): Observable<string> {
    return this._getOptions2.asObservable().pipe(first());
  }

  getApiUrlgetOptions1(): Observable<string> {
    return this._getOptions1.asObservable().pipe(first());
  }

  getApiUrlgetOptions3(): Observable<string> {
    return this._getOptions3.asObservable().pipe(first());
  }

  getApiUrlgetOptions4(): Observable<string> {
    return this._getOptions4.asObservable().pipe(first());
  }

  getApiUrlgetOptions5(): Observable<string> {
    return this._getOptions5.asObservable().pipe(first());
  }

  getApiUrlgetOptions6(): Observable<string> {
    return this._getOptions6.asObservable().pipe(first());
  }

  getApiUrlgetOptions7(): Observable<string> {
    return this._getOptions7.asObservable().pipe(first());
  }

  getApiUrlgetOptions8(): Observable<string> {
    return this._getOptions8.asObservable().pipe(first());
  }

  getApiUrlgetOptions9(): Observable<string> {
    return this._getOptions9.asObservable().pipe(first());
  }

  getApiUrlgetOptions10(): Observable<string> {
    return this._getOptions10.asObservable().pipe(first());
  }

  getApiUrlgetOptions11(): Observable<string> {
    return this._getOptions11.asObservable().pipe(first());
  }

  getApiUrlTsFAHCuurencyMoney(): Observable<string> {
    return this._TsFAHCuurencyMoney.asObservable().pipe(first());
  }

  getApiUrlvalidateCliente360(): Observable<string> {
    return this._validateCliente360.asObservable().pipe(first());
  }

  getApiUrlListReference(): Observable<string> {
    return this._ListReference.asObservable().pipe(first());
  }

  getApiUrlurlOrigen(): Observable<string> {
    return this._urlOrigen.asObservable().pipe(first());
  }

  getApiUrlListPeriod(): Observable<string> {
    return this._ListPeriod.asObservable().pipe(first());
  }

  getApiUrlgetLeader(): Observable<string> {
    return this._getLeader.asObservable().pipe(first());
  }

  getApiUrlcargarAsientos(): Observable<string> {
    return this._cargarAsientos.asObservable().pipe(first());
  }

  getApiUrlsaveHeaderLine(): Observable<string> {
    return this._saveHeaderLine.asObservable().pipe(first());
  }

  getApiUrlTsFahGetSegmentosWS(): Observable<string> {
    return this._TsFahGetSegmentosWS.asObservable().pipe(first());
  }
  getApiUrlTsFahValidacionFechaCerradaGLWS(): Observable<string> {
    return this._TsFahValidacionFechaCerradaGLWS.asObservable().pipe(first());
  }

}
