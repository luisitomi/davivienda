import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodoContableService {

  periodoEndpoint: string = '/periodos-contables';

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
  ) { }

  getPeriodos(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.periodoEndpoint)),
    );
  }
}
