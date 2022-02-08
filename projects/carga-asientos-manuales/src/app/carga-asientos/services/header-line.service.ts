import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ConfigService } from '../../core/services/config.service';
import { ResultadoCarga } from '../../shared';
import { StrinUtil } from '../../shared/component/helpers/string.util';
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
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<InserHeaderLine>(url +
        StrinUtil.replace(
          this.endpoint,
          `8a9447c21fa343e1a27b33302e3b9091`,
          `SvIyCN85XU-f_dOEr5IhOxR6RmFdN4IWCCyb7QePn7I`,
        )
      ,request )),
    );
  }

  getListReference(request: ReferenceComplementaryRequest): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<InserHeaderLine>(url +
        StrinUtil.replace(
          this.endpoint,
          `5dc404d088224351bae8a9c1de15aa8e`,
          `NJ3REyWp4rtSu4-TorYCHddHZOeKPIHNi5iNBm9tzos`,
        )
      ,request )),
    );
  }

  getListPeriod(id: number): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url +
        StrinUtil.replace(
          this.endpoint,
          `fe7761e03e51485ab36115a735e7cdf9`,
          `vt-d0cd5N3R3na3YfPU99if_68pkPbAsnu8ZbrNZtwE`,
        )
      ,{LegderId: id} )),
    );
  }

  getListLeader(): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<any>(url +
        StrinUtil.replace(
          this.endpoint,
          `971afe20b95f4b339b4450dfde1beeda`,
          `yjjdhxmN0zA4BRUNyQOQ8F0XeLA0GURnyUKllpY7w1k`,
        )
      ,)),
    );
  }

  validateCliente360  (id: number): Observable<any> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url +
        StrinUtil.replace(
          this.endpoint,
          `ea44a2ede74c4740adad74e3958a59b0`,
          `DLJrjPd-wwPrRC6_gDkNtav5mDn72By4rzLOJMPuGBg`,
        )
      ,{ NroIdentificacion: id } )),
    );
  }

  cargarAsientos(file: any, usuario: string): Observable<any> {
    let formData = new FormData();
    formData.append('archivo', file);
    formData.append('usuario', usuario);
    console.log(formData)
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>(url +
        StrinUtil.replace(
          this.endpoint,
          `3b2447e6b95b4fbbaa8161bcfef975a2`,
          `vccWf-JC_STsIU9SRp8z03pxcJULvHv9zrbATtYZEDk`,
        )
      ,formData )),
    );
  }
}
