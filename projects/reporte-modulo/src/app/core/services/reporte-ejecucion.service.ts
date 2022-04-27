import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ListadoEjecucionReporte } from '../../shared/models/listado-ejecucion-reporte.model';
import { ParametrosReporteEjecucionParam } from '../../shared/models/parametros-reporte-ejecucion.model';
import { ReporteEjecucionParam } from '../../shared/models/reporte-ejecucion.model';
import { ReporteParam } from '../../shared/models/reporte-param.model';
import { Reporte } from '../../shared/models/reporte.model';
import { TxtLog } from '../../shared/models/txtLog.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteEjecucionService {
  /*
  TsFahTxtTraceModuloReporteWS  = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/bd5dbc5c663248d6bc42d45eb9923887/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DVOzqKNdMdk1UNqaW4qFEtzjvADL8P2SVR0qB2Nuf6g";
  TsFAHListarEjecucionReporteWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/c9584386fc8a407a98c482813e7ce26f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CAB2jcOZbuHBFJt4_l7frSgw4Weu0hHn1xzvfAGe5Ok";
  TsFahModuloReporteEjecutarWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/563dce5b55534d54b22bcf7f127ba922/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=huun4ViILG7PBYhPAGyLeSZYguupFm75juBYX2JkP_M";
  TsFAHParametrosEjecucionModuloReporteWS  = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/58851a47a01e4fd98cff8c991011b309/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=iDt1P9BK_DGzbL9MIgIzHPeIyI0FpzDOXH2v7_zeXT8";  
    TsFAHListarReportesParaEjecucionWS  = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/a10aa59b0b69400d9c8010d10c9c5ef8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0dLXaKiu8EINjJrocB-mqfRvnqz9_4vpPD7V9BgYEhU";
 */
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getTsFAHListarReportesParaEjecucionWS(): Observable<Reporte[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Reporte[]>(this.configService.TsFAHListarReportesParaEjecucionWS)),
    );
  }

  postTsFAHParametrosEjecucionModuloReporteWS(reporte: any): Observable<ParametrosReporteEjecucionParam[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<ParametrosReporteEjecucionParam[]>(this.configService.TsFAHParametrosEjecucionModuloReporteWS, reporte)),
    );
  }
  postTsFahModuloReporteEjecutarWS(ejecucionReporte: ReporteEjecucionParam): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(this.configService.TsFahModuloReporteEjecutarWS, ejecucionReporte)),
    );
  }
  posTsFAHListarEjecucionReporteWS(filtro: any): Observable<ListadoEjecucionReporte[]> {
    debugger;
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<ListadoEjecucionReporte[]>(this.configService.TsFAHListarEjecucionReporteWS, filtro)),
    );
  }

  postTsFahTxtTraceModuloReporteWS(id: any): Observable<TxtLog[]> {
    const data = { Id: id };
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<TxtLog[]>(this.configService.TsFahTxtTraceModuloReporteWS, data)),
    );
  }

  getFile(id: string) {
    return this.http.post(this.configService.TsListarArchivosModuloReporteWS, {IdEjecucion: id});
  }

  getDownoadFile(ruta: string) {
    const httpOptions = {  
      responseType: 'blob' as 'json'  
    };  
    return this.http.post(this.configService.TsModuloReporteDescargarArchivoWS, {rutaArchivo: ruta}, httpOptions);
  }
  
}
