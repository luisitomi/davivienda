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
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Limit[]>(url +
        StrinUtil.replace(
          this.endpoint,
          `9d317e8c8b774207ba020e5d59ad5e6b`,
          `7TEGrryj2uFjqnkBN7CoIR2n0Vw6eLSsIYrFXhaqtp4`,
        ))),
    );
  }

  ChangeStatus(id: number): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.put<any>(url +
        StrinUtil.replace(
          this.endpoint,
          `c466773831084069a89c4d28934eb9d5`,
          `-fBkNsvqLjRVD-TXzBttvYrP-wFhOnneS9mN0EXqTO0`,
        )
      ,{ Id: id, Usuario: "" } )),
    );
  }

  SaveLimit(data: LimitSave): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url +
        StrinUtil.replace(
          this.endpoint,
          `6958c9f9fad040f1a5121a0904200dc6`,
          `GWFzj1pyGjyB2Ag1vopyPew5tr2CSS_6kvHfWodJ2po`,
        )
      ,data )),
    );
  }

  EditLimit(data: LimitEdit): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.put<any>(url +
        StrinUtil.replace(
          this.endpoint,
          `b65a09b1abf54c409f74fdf5682a4c2a`,
          `nfgcWCg7GuW__AmplpMgRt8qfziwqNJrdHihwmOxEAo`,
        )
      ,data )),
    );
  }

  getAccountLine(id: number, cuenta: string, count: number): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url +
        StrinUtil.replace(
          this.endpoint,
          `30c4fcb9d2e64fc78f1eaa54bbf23f8c`,
          `-yhj7pSEVz9ll2S8dsI4_VqFzeaH8yj0D7Vz97GfqXM`,
        )
      ,{Id: id, Cuenta: cuenta, Count: count} )),
    );
  }

  getByIdRol(usuario: string): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url +
        StrinUtil.replace(
          this.endpoint,
          `f8dfa763fb064c14ab07c015da23df77`,
          `vy-z4erZRb8Oz-G2c6Y3tx6ZDmIkl1jRRx3opXZa9js`,
        )
      ,{usuario: usuario})),
    );
  }

}
