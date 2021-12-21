import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';
import { CantidadRegistros, CorreccionColumna, CorreccionFiltro } from '../../shared';

import { Maestra } from '../../shared/models/maestra.model';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class ReprocesoService {

  urlTsFahColumnaProcesoAHCWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/2f826c7fbf05487bb4dcdb5bb0e98f49/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TocuQBqvaWM8itS5gTpenZUEcITw6BkWUG6hK-aaSsw";

  url: string = 'http://rutadelservicio.com/api/v1.0/calcular-registros';
   //actualizarEndpoint: string = '/reproceso/actualizar-registros';
actualizarEndpoint: string = 'https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/62609b20b8794edd8ebe52e4f1b98bb0/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Bqdloeotj50EMk-kii3ct6CGwup5DJUqBAoKIeNsxYc';
 urlCalcularRegistroService = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/27dfedb3733a491bb774e20878fff896/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UhtJpkGjMcUhWGPNq6s9ivLsO4KlTxZs0eOSqopbTWg";

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

  
  calcularCantidadRegistrosService(prmBean: any): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(this.urlCalcularRegistroService,prmBean)),
    )
  }
  calcularCantidadRegistroMetodo(prmBean: any): void{
    this.calcularCantidadRegistrosService(prmBean).subscribe(
      res =>  this.cantidadRegistros.next(res.CantidadRegistros),
      () =>  { return true }
    );
  }

   agregarCantidadRegistro(cantidadRegistros: any) : void {
     console.log('agregarCantidadRegistro')
    this.cantidadRegistros.next(cantidadRegistros)
   }
 
 
  actualizarRegistros(filtros: CorreccionFiltro[], columnas: CorreccionColumna[]): Observable<string> {
    const body: any = { filtros, columnas };
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<any>(url + this.actualizarEndpoint, body)),
      map(res => res.message),
    );
  }

  actualizarRegistrosV2(prmBean: any): Observable<string> {
    
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<any>(/*url +*/ this.actualizarEndpoint, prmBean)),
      map(res => res),
    );
  }
  postTsFahColumnaProcesoAHCWS(origen: string, tipoColumna: number): Observable<Maestra[]> {
    const data = {
      Origen:origen,
      TipoColumna: tipoColumna
    }
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Maestra[]>(this.urlTsFahColumnaProcesoAHCWS,data)),
    );
  }
}
