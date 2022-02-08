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
  endpoint = `/workflows/{$0}/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig={$1}`;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getLimitsHeader(filters: FiltroAsiento): Observable<LimitHeader[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<LimitHeader[]>(url +
        StrinUtil.replace(
          this.endpoint,
          `0bb3e546346f4cc0a9fed34da4d1c4af`,
          `X48M8n-jnIlASimpXOci2aQRXfY-o3kZPPXdk2Qfr6s`,
        ),
        filters
      )),
    );
  }

  saveStatusAsient(filters: FiltroAsientoLimit): Observable<any[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<LimitHeader[]>(url +
        StrinUtil.replace(
          this.endpoint,
          `1ea26fec92224f6e8c612a819f2e6880`,
          `KDLkkzXyxpmeiegR1xBO1z4kegHVqOe6w5ErvN2fR0M`,
        ),
        filters
      )),
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
