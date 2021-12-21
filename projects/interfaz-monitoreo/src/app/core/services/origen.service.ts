import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap,first } from 'rxjs/operators';
import { Origen } from '../../shared';
import { Maestra } from '../../shared/models/maestra.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrigenService {

  endpoint: string = '/origenes';
  urlOrigen ="https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/df64cec7a27c48d4ac5a2d85125ee9f6/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xldpRtwM-lQCTyyz5s5hJuGQGbQIyV_62FQ7s_5t9-w";

  url = 'https://02p-fahlogicapp-d01.azurewebsites.net:443/api/TsSyncOrigenesToAzureWs/triggers/manual/invoke?api-version=2020-05-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5MmNurkZT1uLGTAULkvo4nsVI9tibYfb6iYhAhTinio';
  

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getOrigenes(): Observable<Origen[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Origen[]>(this.urlOrigen)),
    );
  }
  /*
  getOrigenes(): Observable<Origen[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<Origen[]>(this.url,{
        "Columnas": "APPLICATION_NAME, APPLICATION_SHORT_NAME",
        "Tabla": "[xxbol].[TS_FAH_ORIGENES_ALL]"
    })),
    );

    
  } */

/*
  getOrigenMonitoreo(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Maestra[]>(this.urlOrigen)),
    );
  } */

} 
