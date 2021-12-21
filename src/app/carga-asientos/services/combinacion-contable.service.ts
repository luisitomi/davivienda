import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class CombinacionContableService {

  parte1Endpoint: string = '/parte1';
  parte2Endpoint: string = '/parte2';
  parte3Endpoint: string = '/parte3';
  parte4Endpoint: string = '/parte4';
  parte5Endpoint: string = '/parte5';
  parte6Endpoint: string = '/parte6';
  parte7Endpoint: string = '/parte7';
  parte8Endpoint: string = '/parte8';
  parte9Endpoint: string = '/parte9';
  parte10Endpoint: string = '/parte10';
  parte11Endpoint: string = '/parte11';

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
  ) { }

  getParte1(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.parte1Endpoint)),
    );
  }

  getParte2(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.parte2Endpoint)),
    );
  }

  getParte3(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.parte3Endpoint)),
    );
  }

  getParte4(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.parte4Endpoint)),
    );
  }

  getParte5(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.parte5Endpoint)),
    );
  }

  getParte6(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.parte6Endpoint)),
    );
  }

  getParte7(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.parte7Endpoint)),
    );
  }

  getParte8(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.parte8Endpoint)),
    );
  }

  getParte9(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.parte9Endpoint)),
    );
  }

  getParte10(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.parte10Endpoint)),
    );
  }

  getParte11(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.parte11Endpoint)),
    );
  }

}
