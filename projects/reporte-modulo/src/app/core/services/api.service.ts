import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = '';
  TsFahModuloReporteEjecutarWS: string = '';
  TsFahModuloReporteRegistrarWS: string = '';
  TsFAHModuloReporteTipoParametrosWS: string = '';
  TsFAHBuscarModuloReportePorIdWS: string = '';
  TsFAHBuscarParametrosModuloReportePorIdWS: string = '';
  TsFAHListarReportesParaEjecucionWS: string = '';
  TsFAHParametrosEjecucionModuloReporteWS: string = '';
  TsFAHListarEjecucionReporteWS: string = '';
  TsFahTxtTraceModuloReporteWS: string = '';
  TsFAHListadoModuloReporteWS: string = '';
  TsFahObtenerUsuarioWS: string = '';

  TsObtenerPerfilWS: string = '';
  TsModuloReporteEliminarWS: string = '';
  TsListarArchivosModuloReporteWS: string = '';
  TsModuloReporteDescargarArchivoWS: string = '';

  TsFahModuloReporteLovMergeWS:string = '';

  TsFahModuloReporteLovListWS:string = '';

  TsFahModuloReporteEjecucionQueryWS:string = '';

  constructor() { }
}
