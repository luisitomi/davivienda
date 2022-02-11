import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap,first } from 'rxjs/operators';
import { Origen } from '../../shared';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class OrigenService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }
  
  getOrigenes(): Observable<Origen[]> {
    return this.configService.getApiUrlurlOrigen().pipe(
      first(),
      switchMap(url => this.http.get<Origen[]>(url))
    );
  }
  /*
  getOrigenes(): Observable<Origen[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<Origen[]>(this.url,{
        "Columnas": "APPLICATION_NAME, APPLICATION_SHORT_NAME",
        "Tabla": "[xxbol].[TS_FAH_ORIGENES_ALL]"
    })),
    );

    
  } */


} 
