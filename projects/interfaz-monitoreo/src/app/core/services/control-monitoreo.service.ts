import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carga } from 'projects/interfaz-monitoreo/src/app/shared';
import { Observable } from 'rxjs';
import { switchMap,first } from 'rxjs/operators';
import { CuentaContable } from 'src/app/shared';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class ControlMonitoreoService {

  //endpoint: string = '/CuentaContable';

 // url = 'https://02p-fahlogicapp-d01.azurewebsites.net:443/api/TsSyncOrigenesToAzureWs/triggers/manual/invoke?api-version=2020-05-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5MmNurkZT1uLGTAULkvo4nsVI9tibYfb6iYhAhTinio';
 //TsMonitoreoInterfazSalidaWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net/workflows/ec929fc542494d8092f4f5d7efcbb52e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2pm8KqYyNP9rqMHYStldx2ybNMiJyQH05uUu9xb3thg";

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }
/*
  getCuentaContables(): Observable<CuentaContable[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<CuentaContable[]>(this.url,{
        "Columnas": "VALUE_NAME, DESCRIPTION_NAME",
        "Tabla": "[xxbol].[TS_FAH_CUENTA_ALL]"
    })),
    );

    
  }*/
/*
  getListarControYMonitoreo(): Observable<Carga[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Carga[]>(this.TsMonitoreoInterfazSalidaWS)),
    );
  }*/

  postListarControYMonitoreo(data: any): Observable<Carga[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Carga[]>(this.configService.TsMonitoreoInterfazSalidaWS,data)),
    );
  }

} 
