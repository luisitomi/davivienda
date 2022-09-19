import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = '';
  TsFahObtenerUsuarioWS: string = '';
  TsFahGetCuentaContableWS: string = '';
  TsFahGetCompaniaWS: string = '';
  TsFahGetOficinaWS: string = '';
  TsFahGetSucursalWS: string = '';
  TsFahGetProyectoWS: string = '';
  TsFahGetSubproyectoWS: string = '';
  TsFahGetTipoComprobanteWS: string = '';
  TsFahGetIntercompaniaWS: string = '';
  TsFahGetVinculadoWS: string = '';
  TsFahGetFuturo1WS: string = '';
  TsFahGetFuturo2WS: string = '';
  TsFAHCuurencyMoney: string = '';
  TsGetPersona360PornumeroIDWS: string = '';
  TsFahColumnaODICargaAsientoManualWS: string = '';
  TsFAHOrigenCargaContableWS: string = '';
  TsFahPeriodoAllWS: string = '';
  TsFahOperationUnitWS: string = '';
  TsFahCargaAsientosCSVWS: string = '';
  TsCargaAsientoManualSaveWS: string = '';
  TsFahGetSegmentosWS: string = '';
  TsFahValidacionFechaCerradaGLWS: string = '';
  TsFahCargaAsientoCrossCuentasWS: string = '';
  constructor() { }
}
