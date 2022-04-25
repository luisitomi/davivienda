import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';
import { Carga } from '../../shared';
import { ResponseGeneric } from '../../shared/models/response-generic.mode';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CargasService {
//  TsGobiernoInterfacesSalida = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/7ae35253f0e94e4f9298c6f3b2316e5d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Ys1x5grOE1uSEURGoj8NYiHdYqVUu0IK1Gou05L7eNw"; 

//  TsGetGobiernoInterfacesSalidaPorIdWS ="https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/aba473dc95d94cecb9e50398a4917807/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Y4zXY9DNc_GxDRJZPb9c_driErWJQZNJ3VTTNWitHN4";

  //TsFAHReversaCargaGobIntContableWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/f725da99f6d14df794fe854658e41c98/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yMyzfq6QGFYnXINaaL-ZKsNkgT0y0-G-ssC1oblBj9I";
  //TsFAHReprocesarCargaGobIntContableWS  = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/36eb030623a346c8ba73f7dd01c1d5f8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qNNGIYnKprhD9LnRUV02tkKXavr3jCcS2UwoN1Sispg";
  TsFahActualizarEstadosJobMonitoreoCargasWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/89e6662a6fe74e34b45d65ec3802ee9a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5p2eZft075GCbPJBwIcHq0ohXK1ZxxTqQhqAPrUvxl8";
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  postCargas(data: any): Observable<Carga[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Carga[]>(this.configService.TsGobiernoInterfacesSalida,data)),
    );
  }
  getCargaById(id: number): Observable<Carga > {
    const data = { Id: id};
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Carga>(this.configService.TsGetGobiernoInterfacesSalidaPorIdWS,data)),
    );
    
/*
    return this.http.post<Carga>(this.urlCargas).pipe(
      first(),
      map(cargas => cargas.find(carga => carga.id === id)),
    ); */
  }

  postTsFahActualizarEstadosJobMonitoreoCargasWS(usuario: any) : Observable<any>{
    const data = {
      Usuario:usuario
    }
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Carga[]>(this.configService.TsFahActualizarEstadosJobMonitoreoCargasWS,data)),
    );
  }
  /*
  getCargas(
    origen: number = 0,
    despuesDe: Date | null = null,
    antesDe: Date | null = null,
    jobId: string = '',
    estado: string = '',
    nombreArchivo: string = '',
    tipoCarga: string = '',
  ): Observable<Carga[]> {
    let params = new HttpParams()
      .set('origen', origen)
      .set('despues-de', despuesDe?.toISOString() || '')
      .set('antes-de', antesDe?.toISOString() || '')
      .set('job-id', jobId)
      .set('estado', estado)
      .set('nombre-archivo', nombreArchivo)
      .set('tipo', tipoCarga);

    return this.http.get<Carga[]>(this.url, { params: params });
  } */

/*

  reversar(carga: Carga): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.put<any>(url + this.cargaEndpoint + '/' + carga.id, { accion: 'reversar' })),
    );
  }*/

  reversarProceso(fechaContable: string,  id: number, origen: any, usuario: any): Observable<ResponseGeneric> {
    const prmBean = {
      FechaContable:fechaContable,
      Id: id,
      Origen:origen,
      Usuario:usuario
    }
    
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<ResponseGeneric>(this.configService.TsFAHReversaCargaGobIntContableWS,prmBean)),
    );
  }/*
  reprocesar(carga: Carga): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.put<any>(url + this.cargaEndpoint + '/' + carga.id, { accion: 'reprocesar' })),
    );
  }*/
  reprocesarV2(carga: Carga, fechaContable: string, usuario: any): Observable<boolean> {
    const prmBean = {
      FechaContable: fechaContable,
      Id: carga.id,
      Origen: carga.origen,
      Usuario: ""
    }
  
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<any>(this.configService.TsFAHReprocesarCargaGobIntContableWS , prmBean)),
    );
  }

  verLogInformation(id: number): Observable<boolean> {
    const prmBean = {
      Id: id,
    }
  
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<any>(this.configService.TsFahTxtTraceModuloReporteWSMonitoreo , prmBean)),
    );
  }

  //urlTsFAHReprocesarCargaGobIntContableWS
}
