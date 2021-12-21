import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { Lista } from '../models/lista.model';
import { Valor } from '../models/valor.model';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  listaEndpoint: string = '/listas';
  valorEndpoint: string = '/valores';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getListas(): Observable<Lista[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Lista[]>(url + this.listaEndpoint)),
    );
  }

  getValores(lista: Lista): Observable<Valor[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Valor[]>(url + this.listaEndpoint + '/' + lista.id)),
      map(valores => valores.map(v => ({ ...v, oldNombre: v.nombre }))),
    );
  }

  guardarValores(listaId: number, valores: Valor[]):Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url + this.listaEndpoint + '/' + listaId, valores)),
      map(res => true),
    );
  }

  nuevoValor(listaId: number, valor: Valor): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url + this.listaEndpoint + '/' + listaId + this.valorEndpoint, valor)),
      map(res => true),
    );
  }

  eliminarValor(listaId: number, valor: Valor): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.delete<any>(url + this.listaEndpoint +  '/' + listaId + this.valorEndpoint + '/' + valor.id)),
      map(res => true),
    );
  }

}
