import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from '../../core/services/config.service';
import { Maestra } from '../models/maestra.model';


@Injectable({
  providedIn: 'root'
})
export class CombinacionContableService {

  parte1Endpoint: string = '/workflows/8b482552de184aa88c2ea57950bcb63c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GVxpZgmA-WCzy5XKBWBiqdKnrQGLKrDY8NCTgd2QhyI';
  parte2Endpoint: string = '/workflows/95ee3c2fb9884165959ce96d91199eeb/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EDnjqd3qLY5kKOUTjTHad9fHg-vg0wb2fKNasO3bAjU';
  parte3Endpoint: string = '/workflows/8c2561a1e84747beb16d515cc0f8c759/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=k_TFqiFZCVXhnd_ziEyf4d-i6vGWXE1d3phS9AaDqh8';
  parte4Endpoint: string = '/workflows/6d97310b499c4eafbe571fba59ccf6e7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dqC9-zNYPDyUN9QREwUyXMhELkXKRwkMnHXg0ZCpAdk';
  parte5Endpoint: string = '/workflows/72b8dea0f8454413ac0a3219dd55d007/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5N4morkupR_OnOajfEkTsUt8UZhV2kYu5iifL_N56QU';
  parte6Endpoint: string = '/workflows/3172200c9952449d9dfc62d7102bba80/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Qrfptv43S5oaLJsCtVZ7_FH3iE2Uud0ico6mrWIzGBE';
  parte7Endpoint: string = '/workflows/dbeba7ebc762472fbf7e98fe6399d08b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_B8JdxnYnWFINJ2gan50_pg4FXHBWTvoGTX5biKwQ6k';
  parte8Endpoint: string = '/workflows/09929f5cb84848f3b7d9042ec23d5b68/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RddSwYqx81R9SJzQOlGIxX3v-y3ncJrnvVlQdWkgCe4';
  parte9Endpoint: string = '/workflows/bf51c278474243b1a362c8d715127919/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LtbvR4V-KPe-y88OO13rrmUiAPaxsNolZ2AD25GeE-U';
  parte10Endpoint: string = '/workflows/85863ff6d6ab4d36af7d73547df8e6da/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0RaS3QXlXWi-ydDSDXstxjmNNlf7XGQhwZwjYVClyiU';
  parte11Endpoint: string = '/workflows/d105c2a17c334f62ab5480e6e463d68b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kHiEzpIJFYLkXzcpIMbw_jo1Bo6hpP59NBll1QAwtyI';

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
  ) { }

  getParte1(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Maestra[]>(url + this.parte1Endpoint)),
    );
  }

  getParte2(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Maestra[]>(url + this.parte2Endpoint)),
    );
  }

  getParte3(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Maestra[]>(url + this.parte3Endpoint)),
    );
  }

  getParte4(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Maestra[]>(url + this.parte4Endpoint)),
    );
  }

  getParte5(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Maestra[]>(url + this.parte5Endpoint)),
    );
  }

  getParte6(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Maestra[]>(url + this.parte6Endpoint)),
    );
  }

  getParte7(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Maestra[]>(url + this.parte7Endpoint)),
    );
  }

  getParte8(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Maestra[]>(url + this.parte8Endpoint)),
    );
  }

  getParte9(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Maestra[]>(url + this.parte9Endpoint)),
    );
  }

  getParte10(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Maestra[]>(url + this.parte10Endpoint)),
    );
  }

  getParte11(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Maestra[]>(url + this.parte11Endpoint)),
    );
  }

}
