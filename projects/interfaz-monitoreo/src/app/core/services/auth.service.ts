import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { FeaturePermission, Usuario } from 'src/app/shared';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TsAnnouncementsTokenWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/1c3b52c80fd34e1e9e76856bb870fe98/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7_IHw03w7-TauzrmMv-b_bxhjHvfSHqC1hWRPORbwWw";
  url: string = 'http://rutadelservicio.com/api/v1.0/usuario';

  private usuario: BehaviorSubject<Usuario | null> = new BehaviorSubject<Usuario | null>(null);
  private token: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  isLoggedIn(): Observable<boolean> {
    return this.usuario.asObservable().pipe(
      map(u => u === null ? false : true),
    );
  }

  loadUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(this.url).pipe(
      tap(res => this.usuario.next(res)),
    );
  }

  getUsuario(): Observable<Usuario | null | undefined> {
    return this.usuario.asObservable().pipe(
      switchMap(u => u === null ? this.loadUsuario() : of(u)),
    );
  }

  getUsername(): Observable<string | undefined> {
    return this.usuario.asObservable().pipe(
      map(u => u?.nombre),
    );
  }

  getToken(): Observable<string> {
    return this.token.asObservable().pipe(filter(t => t !==''), first());
  }

  getTokenERP(token: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'***',
        Authorization: 'Bearer '+token
      })
    };

    const prmBean = {
      jwt:token
    };
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(this.TsAnnouncementsTokenWS,prmBean)),
    );
  }

  setToken(token: string | undefined): void {
    if (token !== undefined) {
      this.token.next(token);
    }
  }

  getFeaturePermission(): Observable<FeaturePermission[] | undefined> {
    return this.usuario.asObservable().pipe(
      map(u => u?.permisosACaracteristicas),
    );
  }
}
