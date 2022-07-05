import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ConfigService } from '../../core/services/config.service';
import { StrinUtil } from '../../shared/component/helpers/string.util';
import { FiltroAsiento, FiltroAsientoLimit } from '../models/filtro-asiento.model';
import { AccountLineDownload, LimitHeader } from '../models/limite.model';

declare global {
  interface Navigator {
      msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}

if (navigator.msSaveBlob) {
  // use navigator.msSaveBlob
}

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

  consultAsient(filters: any): Observable<any[]> {
    return this.configService.getApiUrlTsFAHConfiguracionLimiteAccountDetail().pipe(
      first(),
      switchMap(url => this.http.post<any[]>(url, filters)),
    );
  }

  download(id: number): Observable<AccountLineDownload[]> {
    return this.configService.getApiUrlTsFAHConfigurationDownload().pipe(
      first(),
      switchMap(url => this.http.post<AccountLineDownload[]>(url, {Id: id})),
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

  postTsAprobacionUsuarioPreparadorWS(filters: any): Observable<any[]> {
    return this.configService.getApiUrlTsAprobacionUsuarioPreparadorWS().pipe(
      first(),
      switchMap(url => this.http.post<any>(url, filters)),
    );
  }

  static exportToCsv(filename: string, rows: any[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ';';
    const keys = Object.keys(rows[0]);
    const csvData =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map((k:any) => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
