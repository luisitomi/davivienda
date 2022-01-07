import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ConfigService } from '../../core/services/config.service';
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
}
