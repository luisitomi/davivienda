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
  getOptions2 = this.enviroment.getOptions2?.replace(
    /\/$/,
    ''
  );
  getParte1 = this.enviroment.getParte1?.replace(
    /\/$/,
    ''
  );
  getOptions3 = this.enviroment.getOptions3?.replace(
    /\/$/,
    ''
  );
  getOptions4 = this.enviroment.getOptions4?.replace(
    /\/$/,
    ''
  );
  getOptions5 = this.enviroment.getOptions5?.replace(
    /\/$/,
    ''
  );
  getOptions6 = this.enviroment.getOptions6?.replace(
    /\/$/,
    ''
  );
  getOptions7 = this.enviroment.getOptions7?.replace(
    /\/$/,
    ''
  );
  getOptions8 = this.enviroment.getOptions8?.replace(
    /\/$/,
    ''
  );
  getOptions9 = this.enviroment.getOptions9?.replace(
    /\/$/,
    ''
  );
  getOptions10 = this.enviroment.getOptions10?.replace(
    /\/$/,
    ''
  );
  getOptions11 = this.enviroment.getOptions11?.replace(
    /\/$/,
    ''
  );
  TsFAHCuurencyMoney = this.enviroment.TsFAHCuurencyMoney?.replace(
    /\/$/,
    ''
  );
  validateCliente360 = this.enviroment.validateCliente360?.replace(
    /\/$/,
    ''
  );
  ListReference = this.enviroment.ListReference?.replace(
    /\/$/,
    ''
  );
  urlOrigen = this.enviroment.urlOrigen?.replace(
    /\/$/,
    ''
  );
  ListPeriod = this.enviroment.ListPeriod?.replace(
    /\/$/,
    ''
  );
  getLeader = this.enviroment.getLeader?.replace(
    /\/$/,
    ''
  );
  cargarAsientos = this.enviroment.cargarAsientos?.replace(
    /\/$/,
    ''
  );
  saveHeaderLine = this.enviroment.saveHeaderLine?.replace(
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
}
