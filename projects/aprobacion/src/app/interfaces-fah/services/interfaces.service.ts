import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { Interfaz } from '../models/interfaz.model';

@Injectable({
  providedIn: 'root'
})
export class InterfacesService {

  interfazEndpoint: string = '/interfaces-fah';
  estadoEndpoint: string = '/estados-interfaz';
  tiempoEndpoint: string= '/tiempos-interfaz';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getInterfaces(nombre: string, descripcion: string): Observable<Interfaz[]> {
    let params = new HttpParams()
      .set('nombre', nombre)
      .set('descripcion', descripcion);

    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Interfaz[]>(url + this.interfazEndpoint, { params })),
      map(interfaces => interfaces.map(i => ({ ...i, oldEstado: i.estado, oldPeriodo: i.periodicidad }))),
    );
  }

  getEstados(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.estadoEndpoint)),
    );
  }

  getTiempos(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.tiempoEndpoint)),
    );
  }

  actualizarInterfaces(interfaces: Interfaz[]): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.put<any>(url + this.interfazEndpoint, interfaces)),
      map(res => true),
    );
  }

  crearInterfaz(interfaz: Interfaz): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url + this.interfazEndpoint, interfaz)),
      map(res => true),
    );
  }

  eliminarInterfaz(interfaz: Interfaz): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.delete<any>(url + this.interfazEndpoint + '/' + interfaz.id)),
      map(res => true),
    );
  }

}
