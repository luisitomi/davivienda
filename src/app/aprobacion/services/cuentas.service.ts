import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  endpoint: string = '/cuentas';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getCuentas(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.endpoint)),
    );
  }
}
