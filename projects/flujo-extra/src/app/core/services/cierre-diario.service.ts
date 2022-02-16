import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { FiltroReporte } from '../../shared/models/filtro-reporte.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CierreDiarioService {

  constructor(    
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getList(reporte: FiltroReporte): Observable<any> {
    return this.configService.getApiUrlListado().pipe(
      first(),
      switchMap(url => this.http.post<any>(url, reporte)),
    );
  }

  getListPre(): Observable<any> {
    return this.configService.getApiUrlListadoPre().pipe(
      first(),
      switchMap(url => this.http.get<any>(url)),
    );
  }

  cierreDia(id: number, user: string): Observable<any> {
    return this.configService.getApiUrlCierre().pipe(
      first(),
      switchMap(url => this.http.post<any>(url,{ Id: id , Usuario: user} )),
    );
  }
}
