import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl = this.enviroment.apiUrl?.replace(
    /\/$/,
    ''
  );
  TsFahObtenerUsuarioWS = this.enviroment.TsFahObtenerUsuarioWS?.replace(
    /\/$/,
    ''
  );
  apiUrlSubject: BehaviorSubject<string> = new BehaviorSubject(this.apiUrl);

  constructor(
    private enviroment: ApiService
  ) { }

  getApiUrl(): Observable<string> {
    return this.apiUrlSubject.asObservable().pipe(first());
  }
}

