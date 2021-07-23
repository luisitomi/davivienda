import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'http://rutadelservicio.com/api/v1.0/usuario';

  private usuario: BehaviorSubject<Usuario | null> = new BehaviorSubject<Usuario | null>(null);

  constructor(
    private http: HttpClient,
  ) { }

  loadUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(this.url).pipe(
      tap(res => this.usuario.next(res))
    );
  }

  getUsuario(): Observable<Usuario | null> {
    return this.usuario.asObservable();
  }
}
