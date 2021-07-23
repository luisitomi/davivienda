import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { CantidadRegistros, CorreccionFiltro } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class ReprocesoService {

  url: string = 'http://rutadelservicio.com/api/v1.0/calcular-registros';

  private cantidadRegistros: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
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
}
