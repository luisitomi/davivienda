import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Cuenta } from 'src/app/shared';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  endpoint: string = '/Cuenta';

  url = 'https://02p-fahlogicapp-d01.azurewebsites.net:443/api/TsSyncOrigenesToAzureWs/triggers/manual/invoke?api-version=2020-05-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5MmNurkZT1uLGTAULkvo4nsVI9tibYfb6iYhAhTinio';
  

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getCuentas(): Observable<Cuenta[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<Cuenta[]>(this.url,{
        "Columnas": "VALUE_NAME, DESCRIPTION_NAME",
        "Tabla": "[xxbol].[TS_FAH_CUENTA_ALL]"
    })),
    );

    
  }
} 
