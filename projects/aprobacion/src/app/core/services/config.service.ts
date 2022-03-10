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
  TsConfigutLimitAsientSave = this.enviroment.TsConfigutLimitAsientSave?.replace(
    /\/$/,
    ''
  );
  TSFAHConfigLimitDesAct = this.enviroment.TSFAHConfigLimitDesAct?.replace(
    /\/$/,
    ''
  );
  TsFAHConfiguracionLimiteHeader = this.enviroment.TsFAHConfiguracionLimiteHeader?.replace(
    /\/$/,
    ''
  );
  TsFAHConfiguracionLimite = this.enviroment.TsFAHConfiguracionLimite?.replace(
    /\/$/,
    ''
  );
  TSFAHConfigLimitSave = this.enviroment.TSFAHConfigLimitSave?.replace(
    /\/$/,
    ''
  );
  TSFAHConfigLimitEdit = this.enviroment.TSFAHConfigLimitEdit?.replace(
    /\/$/,
    ''
  );
  TsFAHConfiguracionLimiteAccount = this.enviroment.TsFAHConfiguracionLimiteAccount?.replace(
    /\/$/,
    ''
  );
  Rol = this.enviroment.Rol?.replace(
    /\/$/,
    ''
  );
  TsFAHConfigurationDownload = this.enviroment.TsFAHConfigurationDownload?.replace(
    /\/$/,
    ''
  );
  TsLimitActiveProfile = this.enviroment.TsLimitActiveProfile?.replace(
    /\/$/,
    ''
  );
  TsFAHConfiguracionLimiteFilter = this.enviroment.TsFAHConfiguracionLimiteFilter?.replace(
    /\/$/,
    ''
  );
  TsFAHConfiguracionLimiteHeaderById = this.enviroment.TsFAHConfiguracionLimiteHeaderById?.replace(
    /\/$/,
    ''
  );
  apiUrlSubject: BehaviorSubject<string> = new BehaviorSubject(this.apiUrl);
  apiUrlSubjectTsConfigutLimitAsientSave: BehaviorSubject<string> = new BehaviorSubject(this.TsConfigutLimitAsientSave);
  apiUrlSubjectTSFAHConfigLimitDesAct: BehaviorSubject<string> = new BehaviorSubject(this.TSFAHConfigLimitDesAct);
  apiUrlSubjectTsFAHConfiguracionLimiteHeader: BehaviorSubject<string> = new BehaviorSubject(this.TsFAHConfiguracionLimiteHeader);
  apiUrlSubjectTsFAHConfiguracionLimite: BehaviorSubject<string> = new BehaviorSubject(this.TsFAHConfiguracionLimite);
  apiUrlSubjectTSFAHConfigLimitSave: BehaviorSubject<string> = new BehaviorSubject(this.TSFAHConfigLimitSave);
  apiUrlSubjectTSFAHConfigLimitEdit: BehaviorSubject<string> = new BehaviorSubject(this.TSFAHConfigLimitEdit);
  apiUrlSubjectTsFAHConfiguracionLimiteAccount: BehaviorSubject<string> = new BehaviorSubject(this.TsFAHConfiguracionLimiteAccount);
  apiUrlSubjectRol: BehaviorSubject<string> = new BehaviorSubject(this.Rol);
  _TsFAHConfigurationDownload: BehaviorSubject<string> = new BehaviorSubject(this.TsFAHConfigurationDownload);
  _TsLimitActiveProfile: BehaviorSubject<string> = new BehaviorSubject(this.TsLimitActiveProfile);
  _TsFAHConfiguracionLimiteFilter: BehaviorSubject<string> = new BehaviorSubject(this.TsFAHConfiguracionLimiteFilter);
  _TsFAHConfiguracionLimiteHeaderById: BehaviorSubject<string> = new BehaviorSubject(this.TsFAHConfiguracionLimiteHeaderById);

  constructor(
    private enviroment: ApiService
  ) { }

  getApiUrl(): Observable<string> {
    return this.apiUrlSubject.asObservable().pipe(first());
  }

  getApiUrlTsConfigutLimitAsientSave(): Observable<string> {
    return this.apiUrlSubjectTsConfigutLimitAsientSave.asObservable().pipe(first());
  }

  getApiUrlTSFAHConfigLimitDesAct(): Observable<string> {
    return this.apiUrlSubjectTSFAHConfigLimitDesAct.asObservable().pipe(first());
  }

  getApiUrlTsFAHConfiguracionLimiteHeader(): Observable<string> {
    return this.apiUrlSubjectTsFAHConfiguracionLimiteHeader.asObservable().pipe(first());
  }

  getApiUrlTsFAHConfiguracionLimite(): Observable<string> {
    return this.apiUrlSubjectTsFAHConfiguracionLimite.asObservable().pipe(first());
  }

  getApiUrlTSFAHConfigLimitSave(): Observable<string> {
    return this.apiUrlSubjectTSFAHConfigLimitSave.asObservable().pipe(first());
  }

  getApiUrlTSFAHConfigLimitEdit(): Observable<string> {
    return this.apiUrlSubjectTSFAHConfigLimitEdit.asObservable().pipe(first());
  }

  getApiUrlTsFAHConfiguracionLimiteAccount(): Observable<string> {
    return this.apiUrlSubjectTsFAHConfiguracionLimiteAccount.asObservable().pipe(first());
  }

  getApiUrlRol(): Observable<string> {
    return this.apiUrlSubjectRol.asObservable().pipe(first());
  }

  getApiUrlTsFAHConfigurationDownload(): Observable<string> {
    return this._TsFAHConfigurationDownload.asObservable().pipe(first());
  }

  getApiUrlTsLimitActiveProfile(): Observable<string> {
    return this._TsLimitActiveProfile.asObservable().pipe(first());
  }

  getApiUrlTsFAHConfiguracionLimiteFilter(): Observable<string> {
    return this._TsFAHConfiguracionLimiteFilter.asObservable().pipe(first());
  }

  getApiUrlTsFAHConfiguracionLimiteHeaderById(): Observable<string> {
    return this._TsFAHConfiguracionLimiteHeaderById.asObservable().pipe(first());
  }
}

