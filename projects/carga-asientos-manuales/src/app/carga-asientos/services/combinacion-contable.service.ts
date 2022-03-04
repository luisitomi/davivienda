import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ConfigService } from '../../core/services/config.service';
import { StrinUtil } from '../../shared/component/helpers/string.util';
import { Maestra } from '../models/maestra.model';


@Injectable({
  providedIn: 'root'
})
export class CombinacionContableService {
  constructor(
    private configService: ConfigService,
    private http: HttpClient,
  ) { }

  getParte1(): Observable<Maestra[]> {
    return this.configService.getApiUrlgetOptions1().pipe(
      switchMap(url => this.http.get<Maestra[]>(url)),
    );
  }

  getParte2(): Observable<Maestra[]> {
    return this.configService.getApiUrlgetOptions2().pipe(
      switchMap(url => this.http.get<Maestra[]>(url)),
    );
  }

  getParte3(name: string): Observable<Maestra[]> {
    return this.configService.getApiUrlgetOptions3().pipe(
      switchMap(url => this.http.post<Maestra[]>(url ,{sucursal: name})),
    );
  }

  getParte4(): Observable<Maestra[]> {
    return this.configService.getApiUrlgetOptions4().pipe(
      switchMap(url => this.http.get<Maestra[]>(url)),
    );
  }

  getParte5(name: string): Observable<Maestra[]> {
    return this.configService.getApiUrlgetOptions5().pipe(
      switchMap(url => this.http.post<Maestra[]>(url ,{compania: name})),
    );
  }

  getParte6(): Observable<Maestra[]> {
    return this.configService.getApiUrlgetOptions6().pipe(
      switchMap(url => this.http.get<Maestra[]>(url)),
    );
  }

  getParte7(): Observable<Maestra[]> {
    return this.configService.getApiUrlgetOptions7().pipe(
      switchMap(url => this.http.get<Maestra[]>(url)),
    );
  }

  getParte8(): Observable<Maestra[]> {
    return this.configService.getApiUrlgetOptions8().pipe(
      switchMap(url => this.http.get<Maestra[]>(url)),
    );
  }

  getParte9(): Observable<Maestra[]> {
    return this.configService.getApiUrlgetOptions9().pipe(
      switchMap(url => this.http.get<Maestra[]>(url)),
    );
  }

  getParte10(): Observable<Maestra[]> {
    return this.configService.getApiUrlgetOptions10().pipe(
      switchMap(url => this.http.get<Maestra[]>(url)),
    );
  }

  getParte11(): Observable<Maestra[]> {
    return this.configService.getApiUrlgetOptions11().pipe(
      switchMap(url => this.http.get<Maestra[]>(url)),
    );
  }

  getListCurrency(): Observable<any> {
    return this.configService.getApiUrlTsFAHCuurencyMoney().pipe(
      first(),
      switchMap(url => this.http.get<any>(url)),
    );
  }

}
