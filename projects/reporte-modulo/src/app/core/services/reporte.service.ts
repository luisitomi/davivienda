import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maestra } from 'projects/interfaz-monitoreo/src/app/shared/models/maestra.model';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { FiltroReporte } from '../../shared/models/filtro-reporte.model';
import { ReporteParam } from '../../shared/models/reporte-param.model';
import { Reporte } from '../../shared/models/reporte.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  /*
  TsFAHBuscarParametrosModuloReportePorIdWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/37ac489faa59457b8857cf32ce6299ed/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5yVS67NWWHfAXN1wq0FWmbozHRCWtGRbIfVLnTVlp8Q";
  TsFAHBuscarModuloReportePorIdWS ="https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/8743db7e040d4fe887f8fcd6b7640dce/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8eWrrEUfOhhcWNGI5S_ONjcp805M9k6px-WiS8chLEQ";
  TsFAHModuloReporteTipoParametrosWS ="https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/f5f047ad2bbe404f983a162aa244a301/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9pgGnLi6wVXIgNVWKdBA76h2zjhX89v6Xp_acP50auM";
  TsFahModuloReporteRegistrarWS  = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/094d679dc5664545b7b7b51b3c81c771/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=z__PqLvgjMArU7qMmMCB2EktYdwoNWqFRcrjrl8Oy0Y";
  TsFAHListadoModuloReporteWS  = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/67864ef2a2324e33a90df05f4adb8d9b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_Kql1BZN0nteG4j-nhKR5JqHBV8OG-_p9bPN3kvxGvg";
  endpoint: string = '/estados-carga';
  url = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/c98b5b8b8b67416fa00fb647ee2fc10b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5ChglnE_iJEv5lXY-66cLNW8YA_cQpQqZCYTMvX8sjI";
  */
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

    getTsFAHModuloReporteTipoParametrosWS(): Observable<Maestra[]>{
      return this.configService.getApiUrl().pipe(
        first(),
        switchMap(url => this.http.get<Maestra[]>(this.configService.TsFAHModuloReporteTipoParametrosWS)),
      );
    }
/*
  getListarControYMonitoreo(): Observable<Carga[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Carga[]>(this.url)),
    );
  }*/
  postTsFahModuloReporteRegistrarWS(reporte: Reporte, usuario: any): Observable<any> {
    reporte.CreadoPor = usuario;
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(this.configService.TsFahModuloReporteRegistrarWS,reporte)),
    );
  }

  postTsFAHListadoModuloReporteWS (filtroReporte: FiltroReporte): Observable<Reporte[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Reporte[]>(this.configService.TsFAHListadoModuloReporteWS,filtroReporte)),
    );
  } 
  postTsFAHBuscarModuloReportePorIdWS(reporte: any): Observable<Reporte> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Reporte>(this.configService.TsFAHBuscarModuloReportePorIdWS,reporte)),
    );
  } 
  postTsFAHBuscarParametrosModuloReportePorIdWS(reporte: any): Observable<ReporteParam[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<ReporteParam[]>(this.configService.TsFAHBuscarParametrosModuloReportePorIdWS,reporte)),
      );
    }
}
