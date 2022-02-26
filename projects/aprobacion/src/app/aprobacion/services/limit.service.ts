import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ConfigService } from '../../core/services/config.service';
import { StrinUtil } from '../../shared/component/helpers/string.util';
import { Limit, LimitEdit, LimitSave } from '../models/limite.model';

@Injectable({
  providedIn: 'root'
})
export class LimitService {
  endpoint = `/workflows/{$0}/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig={$1}`;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getLimits(): Observable<Limit[]> {
    return this.configService.getApiUrlTsFAHConfiguracionLimite().pipe(
      first(),
      switchMap(url => this.http.get<Limit[]>(url)),
    );
  }

  ChangeStatus(id: number): Observable<any> {
    return this.configService.getApiUrlTSFAHConfigLimitDesAct().pipe(
      first(),
      switchMap(url => this.http.put<any>(url,{ Id: id, Usuario: "" } )),
    );
  }

  SaveLimit(data: LimitSave): Observable<any> {
    return this.configService.getApiUrlTSFAHConfigLimitSave().pipe(
      first(),
      switchMap(url => this.http.post<any>(url,data )),
    );
  }

  EditLimit(data: LimitEdit): Observable<any> {
    return this.configService.getApiUrlTSFAHConfigLimitEdit().pipe(
      first(),
      switchMap(url => this.http.put<any>(url,data )),
    );
  }

  getAccountLine(id: number, cuenta: string, count: number): Observable<any> {
    return this.configService.getApiUrlTsFAHConfiguracionLimiteAccount().pipe(
      first(),
      switchMap(url => this.http.post<any>(url,{Id: id, Cuenta: cuenta, Count: count} )),
    );
  }

  getByIdRol(usuario: string): Observable<any> {
    return this.configService.getApiUrlRol().pipe(
      first(),
      switchMap(url => this.http.post<any>(url,{usuario: usuario})),
    );
  }

  getByIdProfile(usuario: string, nivel: number): Observable<any> {
    return this.configService.getApiUrlTsLimitActiveProfile().pipe(
      first(),
      switchMap(url => this.http.post<any>(url,{Usuario: usuario, Nivel: nivel})),
    );
  }

}
