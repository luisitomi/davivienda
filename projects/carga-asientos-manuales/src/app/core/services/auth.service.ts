import { HttpClient } from '@angular/common/http';
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

  getUsuarioV2() {
    return this.usuario.asObservable().pipe(
      map(u => u?.email),
    );
  }

  getToken(): Observable<string> {
    return this.token.asObservable().pipe(filter(t => t !==''), first());
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

  postTsFahObtenerUsuarioWS (tokenJson: any) : Observable<Usuario> {
    const data = {usuario: tokenJson.prn};
/*    let jsonUsuario :Usuario;
   
   jsonUsuario = {
    id: 0,
    nombre: "",
    email: data+'',
    permisosACaracteristicas: []
  };
  this.usuario.next(jsonUsuario) */
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Usuario>(this.configService.TsFahObtenerUsuarioWS,data).pipe(
        tap(res => this.usuario.next(res)),
      )),
    );
  }
}
