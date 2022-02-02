import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maestra } from 'projects/interfaz-monitoreo/src/app/shared/models/maestra.model';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { FiltroReporte } from '../../shared/models/filtro-reporte.model';
import { ParametrosReporteEjecucionParam } from '../../shared/models/parametros-reporte-ejecucion.model';
import { ReporteParam } from '../../shared/models/reporte-param.model';
import { Reporte } from '../../shared/models/reporte.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteEjecucionService {
  TsFAHParametrosEjecucionModuloReporteWS  = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/58851a47a01e4fd98cff8c991011b309/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=iDt1P9BK_DGzbL9MIgIzHPeIyI0FpzDOXH2v7_zeXT8";  
    TsFAHListarReportesParaEjecucionWS  = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/a10aa59b0b69400d9c8010d10c9c5ef8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0dLXaKiu8EINjJrocB-mqfRvnqz9_4vpPD7V9BgYEhU";
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

    getTsFAHListarReportesParaEjecucionWS(): Observable<Reporte[]>{
      return this.configService.getApiUrl().pipe(
        first(),
        switchMap(url => this.http.get<Reporte[]>(this.TsFAHListarReportesParaEjecucionWS)),
      );
    }

    postTsFAHParametrosEjecucionModuloReporteWS (reporte: any): Observable<ParametrosReporteEjecucionParam[]> {
      return this.configService.getApiUrl().pipe(
        first(),
        switchMap(url => this.http.post<ParametrosReporteEjecucionParam[]>(this.TsFAHParametrosEjecucionModuloReporteWS ,reporte)),
        );
      }

}
