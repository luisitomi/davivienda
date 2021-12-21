import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Infolet } from 'projects/interfaz-monitoreo/src/app/shared';
import { Observable } from 'rxjs';
import { switchMap,first } from 'rxjs/operators';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class InfoletService {

  urlTsFahInfoletPorOrigenWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/9bf8c8ea204d4aba852b7bd7afcc2f1d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PDR6Ps80tIqevkoL1rAkB3PPpdYfRarWFnz2VLQebqo";
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }


  postInfoletPorOrigen(origen: any): Observable<Infolet> {
    let prmBean = {
      Origen:origen
    }
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Infolet>(this.urlTsFahInfoletPorOrigenWS,prmBean)),
    );
  }

} 
