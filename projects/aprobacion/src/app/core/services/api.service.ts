import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = '';
  TsFahObtenerUsuarioWS: string = '';
  TsConfigutLimitAsientSave: string = '';
  TSFAHConfigLimitDesAct: string = '';
  TsFAHConfiguracionLimiteHeader: string = '';
  TsFAHConfiguracionLimite: string = '';
  TSFAHConfigLimitSave: string = '';
  TSFAHConfigLimitEdit: string = '';
  TsFAHConfiguracionLimiteAccount: string = '';
  TsFahObtenerRolesPorUsuarioWS: string = '';
  TsFAHConfigurationDownload: string = '';
  TsLimitActiveProfile: string = '';
  TsFAHConfiguracionLimiteFilter: string = '';
  TsFAHConfiguracionLimiteHeaderById: string = '';
  TsFAHConfiguracionLimiteAccountDetail: string = '';
  TsAprobacionUsuarioPreparadorWS: string = '';

  constructor() { }
}
