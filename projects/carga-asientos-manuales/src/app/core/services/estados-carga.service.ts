import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maestra } from 'projects/interfaz-monitoreo/src/app/shared/models/maestra.model';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EstadosCargaService {

  endpoint: string = '/estados-carga';
  url = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/c98b5b8b8b67416fa00fb647ee2fc10b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5ChglnE_iJEv5lXY-66cLNW8YA_cQpQqZCYTMvX8sjI";
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getEstados(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.endpoint)),
    );
  }

/*
  getListarControYMonitoreo(): Observable<Carga[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Carga[]>(this.url)),
    );
  }*/
  getEstadosMonitoreo(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Maestra[]>(this.url)),
    );
  }

  
}
