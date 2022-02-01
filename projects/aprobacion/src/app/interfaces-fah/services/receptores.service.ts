import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { ReceptorNotificacion } from '../models/receptor-notificacion.model';

@Injectable({
  providedIn: 'root'
})
export class ReceptoresService {

  receptorEndpoint: string = '/receptores';

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
  ) { }

  getReceptores(email: string): Observable<ReceptorNotificacion[]> {
    const params = new HttpParams().set('email', email || '');
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<ReceptorNotificacion[]>(url + this.receptorEndpoint, { params })),
    );
  }

  nuevoReceptor(receptor: ReceptorNotificacion): Observable<string> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<any>(url + this.receptorEndpoint, receptor)),
      map(res => res.message),
    );
  }

  eliminarReceptor(id: number): Observable<string> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.delete<any>(`${url}${this.receptorEndpoint}/${id}`)),
      map(res => res.message),
    )
  }

  eliminarReceptores(ids: number[]): Observable<string> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.delete<any>(url + this.receptorEndpoint, { body: ids })),
      map(res => res.message),
    );
  }
}
