import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoAsientoService {

  endpoint: string = '/estados-asiento';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  url = 'https://02p-fahlogicapp-d01.azurewebsites.net:443/api/TsSyncOrigenesToAzureWs/triggers/manual/invoke?api-version=2020-05-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5MmNurkZT1uLGTAULkvo4nsVI9tibYfb6iYhAhTinio';

  getEstados(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<string[]>(this.url,{
        "Columnas": "APPLICATION_NAME, APPLICATION_SHORT_NAME",
        "Tabla": "[xxbol].[TS_FAH_ORIGENES_ALL]"
    })),
    );
  }

}
