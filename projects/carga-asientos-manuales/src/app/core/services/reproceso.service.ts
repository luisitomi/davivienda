import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CantidadRegistros, CorreccionColumna, CorreccionFiltro } from 'src/app/shared';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReprocesoService {

  url: string = 'http://rutadelservicio.com/api/v1.0/calcular-registros';
  actualizarEndpoint: string = '/reproceso/actualizar-registros';

  private cantidadRegistros: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
  ) { }

  getCantidadRegistros(): Observable<number> {
    return this.cantidadRegistros.asObservable();
  }

  calcularCantidadRegistros(filtros: CorreccionFiltro[]): void {
    let params = new HttpParams()
      .set('filtros', JSON.stringify(filtros));

    this.http.get<CantidadRegistros>(this.url, { params: params }).subscribe(
      res => this.cantidadRegistros.next(res.cantidad),
    );
  }

  actualizarRegistros(filtros: CorreccionFiltro[], columnas: CorreccionColumna[]): Observable<string> {
    const body: any = { filtros, columnas };
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<any>(url + this.actualizarEndpoint, body)),
      map(res => res.message),
    );
  }
}
