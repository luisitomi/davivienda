import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { Infolet } from 'src/app/shared';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  endpoint: string = '/infolets';
  urlTsFahInfoletPorOrigenWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/72ec242120794ef7b935775ab0b02e4f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2SymntpMrtfrO61TVfM3T2Mi4c2k8guI7SVGc7KeFaw";
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

/*  getInfolets(): Observable<Infolet[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Infolet[]>(url + this.endpoint)),
    );
  }*/


  
  getInfolets(origen: any): Observable<Infolet[]> {
    let prmBean = {
      Origen:origen
    }
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Infolet[]>(this.urlTsFahInfoletPorOrigenWS,prmBean)),
    );
  }

}
