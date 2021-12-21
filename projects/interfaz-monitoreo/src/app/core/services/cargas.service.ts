import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';
import { Carga } from '../../shared';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CargasService {
  urlCargas = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/7ae35253f0e94e4f9298c6f3b2316e5d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Ys1x5grOE1uSEURGoj8NYiHdYqVUu0IK1Gou05L7eNw"; 
  url: string = 'http://rutadelservicio.com/api/v1.0/cargas';
  urlGetCargasXId ="https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/aba473dc95d94cecb9e50398a4917807/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Y4zXY9DNc_GxDRJZPb9c_driErWJQZNJ3VTTNWitHN4";
  cargaEndpoint: string = '/cargas';
  urlTsFAHReversaCargaGobIntContableWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/f725da99f6d14df794fe854658e41c98/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yMyzfq6QGFYnXINaaL-ZKsNkgT0y0-G-ssC1oblBj9I";
  urlTsFAHReprocesarCargaGobIntContableWS  = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/36eb030623a346c8ba73f7dd01c1d5f8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qNNGIYnKprhD9LnRUV02tkKXavr3jCcS2UwoN1Sispg";
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  postCargas(data: any): Observable<Carga[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Carga[]>(this.urlCargas,data)),
    );
  }
  getCargaById(id: number): Observable<Carga > {
    const data = { Id: id};
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Carga>(this.urlGetCargasXId,data)),
    );
/*
    return this.http.post<Carga>(this.urlCargas).pipe(
      first(),
      map(cargas => cargas.find(carga => carga.id === id)),
    ); */
  }
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
  }



  reversar(carga: Carga): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.put<any>(url + this.cargaEndpoint + '/' + carga.id, { accion: 'reversar' })),
    );
  }

  reversarProceso(fechaContable: string,  id: number, origen: any, usuario: string): Observable<boolean> {
    const prmBean = {
      FechaContable:fechaContable,
      Id: id,
      Origen:origen,
      Usuario:usuario
    }
    console.log('prmBean:')
    console.log(prmBean);
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(this.urlTsFAHReversaCargaGobIntContableWS,prmBean)),
    );
  }
  reprocesar(carga: Carga): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.put<any>(url + this.cargaEndpoint + '/' + carga.id, { accion: 'reprocesar' })),
    );
  }
  reprocesarV2(carga: Carga, fechaContable: string): Observable<boolean> {
    const prmBean = {
      FechaContable: fechaContable,
      Id: carga.id,
      Origen: carga.origen,
      Usuario: ""
    }
    console.log('prmBean')
    console.log(JSON.stringify(prmBean))
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<any>(this.urlTsFAHReprocesarCargaGobIntContableWS , prmBean)),
    );
  }

  //urlTsFAHReprocesarCargaGobIntContableWS
}
