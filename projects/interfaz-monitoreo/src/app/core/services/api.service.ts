import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = '';

  TsMonitoreoInterfazSalidaWS : string = '';
TsGobContableEstadoWS : string = '';
TsGobContableTipoCargaWS : string = '';
TsFahTxtTraceIntSalLogWS : string = '';
TsFAHReprocesarCargaGobIntContableWS : string = '';
TsGetGobiernoInterfacesSalidaPorIdWS : string = '';
TsFahEstadoMonitoreoInterfazSalida : string = '';
TsRegistroCorreccionAHCWS : string = '';
TsFahCorreccionRegistrosWS : string = '';
TsAnnouncementsTokenWS : string = '';
TsGobiernoInterfacesSalida : string = '';
TsEliminarCorreccionAHCWS : string = '';
TsFahInfoletPorOrigenWS : string = '';
TsCalcularCantidadRegistrosWS : string = '';
TsModificarRegistrosTMPGobIntSalWS : string = '';
TsFAHListarInfoletWS : string = '';
TsFahColumnaProcesoAHCWS : string = '';
TsListarColumnasCorreccionXProcesoWS : string = '';
TsFAHReversaCargaGobIntContableWS : string = '';
TsFahOrigenMonitoreoInterfazSalida : string = '';

TsFahObtenerUsuarioWS : string = '';
TsFahObtenerRolesPorUsuarioWS : string = '';
TsFAHOrigenCargaContableWS : string = '';
TsFahActualizarEstadosJobMonitoreoCargasWS: string = '';

TsFAHConfiguracionProfileIM: string = '';

  constructor() { }
}
