import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { EstadoDia } from 'src/app/shared';
import { ResultadoCierre } from 'src/app/shared/models/resultado-cierre.response';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EstadosDiaService {

  endpoint: string = '/estados-dia';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getEstados(inicio: Date, fin: Date): Observable<EstadoDia[]> {
    let params = new HttpParams()
      .set('inicio', moment(inicio).toISOString())
      .set('fin', moment(fin).toISOString());

    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<EstadoDia[]>(url + this.endpoint, { params })),
    );
  }

  cerrarDia(id: number): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<ResultadoCierre>(url + this.endpoint, { id })),
      map(r => true),
    );
  }
}
