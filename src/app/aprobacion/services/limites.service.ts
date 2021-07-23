import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { Limite } from '../models/limite.model';

@Injectable({
  providedIn: 'root'
})
export class LimitesService {

  nivelesEndpoint: string = '/niveles';
  limitesEndPoint: string = '/limites';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getNiveles(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.nivelesEndpoint)),
    );
  }

  getLimites(nivel: string): Observable<Limite[]> {
    let params = new HttpParams().set('nivel', nivel);

    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Limite[]>(url + this.limitesEndPoint, { params })),
    );
  }

  cambiarLimites(limites: Limite[]): Observable<string> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<string>(url + this.limitesEndPoint, limites)),
    );
  }

}
