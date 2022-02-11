import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ConfigService } from '../../core/services/config.service';
import { StrinUtil } from '../../shared/component/helpers/string.util';
import { FiltroAsiento, FiltroAsientoLimit } from '../models/filtro-asiento.model';
import { LimitHeader } from '../models/limite.model';

@Injectable({
  providedIn: 'root'
})
export class LimitHeaderService {
  endpoint = ``;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getLimitsHeader(filters: FiltroAsiento): Observable<LimitHeader[]> {
    return this.configService.getApiUrlTsFAHConfiguracionLimiteHeader().pipe(
      first(),
      switchMap(url => this.http.post<LimitHeader[]>(url,filters)),
    );
  }

  saveStatusAsient(filters: FiltroAsientoLimit): Observable<any[]> {
    return this.configService.getApiUrlTsConfigutLimitAsientSave().pipe(
      first(),
      switchMap(url => this.http.post<LimitHeader[]>(url, filters)),
    );
  }

  statusLineMethod(nivel: number, usuario: string): Observable<any[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<LimitHeader[]>(url +
        StrinUtil.replace(
          this.endpoint,
          `678877db794047e4951deb34680603f2`,
          `5YRByhJjiiP3ShVdgHjR7fcNkXxAMFd_iXKwFJOJLPo`,
        ),
        {Usuario: usuario, Nivel: nivel}
      )),
    );
  }

}
