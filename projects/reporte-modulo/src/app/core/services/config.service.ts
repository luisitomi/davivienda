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
  TsFahModuloReporteEjecutarWS = this.enviroment.TsFahModuloReporteEjecutarWS?.replace(
    /\/$/,
    ''
  );
  TsFahModuloReporteRegistrarWS = this.enviroment.TsFahModuloReporteRegistrarWS?.replace(
    /\/$/,
    ''
  );
  TsFAHModuloReporteTipoParametrosWS = this.enviroment.TsFAHModuloReporteTipoParametrosWS?.replace(
    /\/$/,
    ''
  );
  TsFAHBuscarModuloReportePorIdWS = this.enviroment.TsFAHBuscarModuloReportePorIdWS?.replace(
    /\/$/,
    ''
  );
  TsFAHBuscarParametrosModuloReportePorIdWS = this.enviroment.TsFAHBuscarParametrosModuloReportePorIdWS?.replace(
    /\/$/,
    ''
  );
  TsFAHListarReportesParaEjecucionWS = this.enviroment.TsFAHListarReportesParaEjecucionWS?.replace(
    /\/$/,
    ''
  );
  TsFAHParametrosEjecucionModuloReporteWS = this.enviroment.TsFAHParametrosEjecucionModuloReporteWS?.replace(
    /\/$/,
    ''
  );
  TsFAHListarEjecucionReporteWS = this.enviroment.TsFAHListarEjecucionReporteWS?.replace(
    /\/$/,
    ''
  );
  TsFahTxtTraceModuloReporteWS = this.enviroment.TsFahTxtTraceModuloReporteWS?.replace(
    /\/$/,
    ''
  );
  TsFAHListadoModuloReporteWS = this.enviroment.TsFAHListadoModuloReporteWS?.replace(
    /\/$/,
    ''
  );
  TsFahObtenerUsuarioWS = this.enviroment.TsFahObtenerUsuarioWS?.replace(
    /\/$/,
    ''
  );

  TsObtenerPerfilWS = this.enviroment.TsObtenerPerfilWS?.replace(
    /\/$/,
    ''
  );

  TsModuloReporteEliminarWS = this.enviroment.TsModuloReporteEliminarWS?.replace(
    /\/$/,
    ''
  );
  TsListarArchivosModuloReporteWS = this.enviroment.TsListarArchivosModuloReporteWS?.replace(
    /\/$/,
    ''
  );
  TsModuloReporteDescargarArchivoWS = this.enviroment.TsModuloReporteDescargarArchivoWS?.replace(
    /\/$/,
    ''
  );

  TsFahModuloReporteLovMergeWS= this.enviroment.TsFahModuloReporteLovMergeWS?.replace(
    /\/$/,
    ''
  );

  TsFahModuloReporteLovListWS = this.enviroment.TsFahModuloReporteLovListWS?.replace(
    /\/$/,
    ''
  );

  TsFahModuloReporteEjecucionQueryWS= this.enviroment.TsFahModuloReporteEjecucionQueryWS?.replace(
    /\/$/,
    ''
  );

  apiUrlSubject: BehaviorSubject<string> = new BehaviorSubject(this.apiUrl);

  constructor(
    private enviroment: ApiService
  ) { }

  getApiUrl(): Observable<string> {
    return this.apiUrlSubject.asObservable().pipe(first());
  }
}
