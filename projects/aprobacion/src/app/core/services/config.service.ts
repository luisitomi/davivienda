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
  Rol = this.enviroment.TsFahObtenerRolesPorUsuarioWS?.replace(
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
  TsFAHConfiguracionLimiteAccountDetail = this.enviroment.TsFAHConfiguracionLimiteAccountDetail?.replace(
    /\/$/,
    ''
  );
  TsAprobacionUsuarioPreparadorWS = this.enviroment.TsAprobacionUsuarioPreparadorWS?.replace(
    /\/$/,
    ''
  );
  TsFAHOrigenCargaContableWS = this.enviroment.TsFAHOrigenCargaContableWS?.replace(
    /\/$/,
    ''
  );
  TsFahGetAprobacionTipoComprobanteFiltroWS = this.enviroment.TsFahGetAprobacionTipoComprobanteFiltroWS?.replace(
    /\/$/,
    ''
  );
  TsFahGetAprobacionPreparadorFiltroWS = this.enviroment.TsFahGetAprobacionPreparadorFiltroWS?.replace(
    /\/$/,
    ''
  );
  TsFahGetAprobacionAprobadoresFiltroWS = this.enviroment.TsFahGetAprobacionAprobadoresFiltroWS?.replace(
    /\/$/,
    ''
  );
  TsFahGetAprobacionPoliticaLimiteFiltroWS = this.enviroment.TsFahGetAprobacionPoliticaLimiteFiltroWS?.replace(
    /\/$/,
    ''
  );
  TsFahGetAprobacionEstadoFiltroWS = this.enviroment.TsFahGetAprobacionEstadoFiltroWS?.replace(
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
  _TsFAHConfiguracionLimiteAccountDetail: BehaviorSubject<string> = new BehaviorSubject(this.TsFAHConfiguracionLimiteAccountDetail);
  _TsAprobacionUsuarioPreparadorWS: BehaviorSubject<string> = new BehaviorSubject(this.TsAprobacionUsuarioPreparadorWS);
 
  _TsFAHOrigenCargaContableWS: BehaviorSubject<string> = new BehaviorSubject(this.TsFAHOrigenCargaContableWS);
  _TsFahGetAprobacionTipoComprobanteFiltroWS: BehaviorSubject<string> = new BehaviorSubject(this.TsFahGetAprobacionTipoComprobanteFiltroWS);
  _TsFahGetAprobacionPreparadorFiltroWS: BehaviorSubject<string> = new BehaviorSubject(this.TsFahGetAprobacionPreparadorFiltroWS);
  _TsFahGetAprobacionAprobadoresFiltroWS: BehaviorSubject<string> = new BehaviorSubject(this.TsFahGetAprobacionAprobadoresFiltroWS);
  _TsFahGetAprobacionPoliticaLimiteFiltroWS: BehaviorSubject<string> = new BehaviorSubject(this.TsFahGetAprobacionPoliticaLimiteFiltroWS);
  _TsFahGetAprobacionEstadoFiltroWS: BehaviorSubject<string> = new BehaviorSubject(this.TsFahGetAprobacionEstadoFiltroWS);
 
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

  getApiUrlTsFAHConfiguracionLimiteAccountDetail(): Observable<any> {
    return this._TsFAHConfiguracionLimiteAccountDetail.asObservable().pipe(first());
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
  getApiUrlTsAprobacionUsuarioPreparadorWS(): Observable<string> {
    return this._TsAprobacionUsuarioPreparadorWS.asObservable().pipe(first());
  }
  
  getApiUrlTsFAHOrigenCargaContableWS(): Observable<string> {
    return this._TsFAHOrigenCargaContableWS.asObservable().pipe(first());
  }
  getApiUrlTsFahGetAprobacionTipoComprobanteFiltroWS(): Observable<string> {
    return this._TsFahGetAprobacionTipoComprobanteFiltroWS.asObservable().pipe(first());
  }
  getApiUrlTsFahGetAprobacionPreparadorFiltroWS(): Observable<string> {
    return this._TsFahGetAprobacionPreparadorFiltroWS.asObservable().pipe(first());
  }
  getApiUrlTsFahGetAprobacionAprobadoresFiltroWS(): Observable<string> {
    return this._TsFahGetAprobacionAprobadoresFiltroWS.asObservable().pipe(first());
  }
  getApiUrlTsFahGetAprobacionPoliticaLimiteFiltroWS(): Observable<string> {
    return this._TsFahGetAprobacionPoliticaLimiteFiltroWS.asObservable().pipe(first());
  }
  getApiUrlTsFahGetAprobacionEstadoFiltroWS(): Observable<string> {
    return this._TsFahGetAprobacionEstadoFiltroWS.asObservable().pipe(first());
  }
}

