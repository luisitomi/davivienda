import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ConfigService } from '../../core/services/config.service';
import { InserHeaderLine } from '../models/insert-header-line';
import { ReferenceComplementaryRequest } from '../models/referencia-complementaria.model';
@Injectable({
  providedIn: 'root'
})
export class HeaderLineService {

  endpoint = `/workflows/{$0}/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig={$1}`;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  saveHeaderLine(request: InserHeaderLine): Observable<any> {
    return this.configService.getApiUrlsaveHeaderLine().pipe(
      first(),
      switchMap(url => this.http.post<InserHeaderLine>(url,request )),
    );
  }

  getListReference(request: ReferenceComplementaryRequest): Observable<any> {
    return this.configService.getApiUrlListReference().pipe(
      first(),
      switchMap(url => this.http.post<InserHeaderLine>(url ,request )),
    );
  }

  getListPeriod(id: number): Observable<any> {
    return this.configService.getApiUrlListPeriod().pipe(
      first(),
      switchMap(url => this.http.post<any>(url,{LegderId: id} )),
    );
  }

  getListLeader(): Observable<any> {
    return this.configService.getApiUrlgetLeader().pipe(
      first(),
      switchMap(url => this.http.get<any>(url)),
    );
  }

  validateCliente360  (id: number): Observable<any> {
    return this.configService.getApiUrlvalidateCliente360().pipe(
      first(),
      switchMap(url => this.http.post<any>(url,{ NroIdentificacion: id } )),
    );
  }

  cargarAsientos(file: any, usuario: string): Observable<any> {
    let formData = new FormData();
    formData.append('archivo', file);
    formData.append('usuario', usuario);
    return this.configService.getApiUrlcargarAsientos().pipe(
      first(),
      switchMap(url => this.http.post<any>(url, formData )),
    );
  }

  getApiUrlTsFahGetSegmentosWS(request: any): Observable<any> {
    return this.configService.getApiUrlTsFahGetSegmentosWS().pipe(
      first(),
      switchMap(url => this.http.post<any>(url, request)),
    );
  }
}
