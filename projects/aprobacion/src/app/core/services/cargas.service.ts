import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { Carga } from 'src/app/shared';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CargasService {
  urlTsFAHReversaCargaGobIntContableWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/f725da99f6d14df794fe854658e41c98/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yMyzfq6QGFYnXINaaL-ZKsNkgT0y0-G-ssC1oblBj9I";
  url: string = 'http://rutadelservicio.com/api/v1.0/cargas';
  cargaEndpoint: string = '/cargas';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

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

  getCargaById(id: number): Observable<Carga | undefined> {
    return this.http.get<Carga[]>(this.url).pipe(
      map(cargas => cargas.find(carga => carga.id === id)),
    );
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

}
