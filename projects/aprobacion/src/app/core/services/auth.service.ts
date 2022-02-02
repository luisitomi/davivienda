import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { FeaturePermission, Usuario } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'http://rutadelservicio.com/api/v1.0/usuario';

  private usuario: BehaviorSubject<Usuario | null> = new BehaviorSubject<Usuario | null>(null);
  private token: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
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
