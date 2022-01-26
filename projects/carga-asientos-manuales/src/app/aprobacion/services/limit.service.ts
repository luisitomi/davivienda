import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ConfigService } from '../../core/services/config.service';
import { StrinUtil } from '../../shared/component/helpers/string.util';
import { Limit } from '../models/limite.model';

@Injectable({
  providedIn: 'root'
})
export class LimitService {
  endpoint = `/workflows/{$0}/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig={$1}`;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getLimits(): Observable<Limit[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Limit[]>(url +
        StrinUtil.replace(
          this.endpoint,
          `9d317e8c8b774207ba020e5d59ad5e6b`,
          `7TEGrryj2uFjqnkBN7CoIR2n0Vw6eLSsIYrFXhaqtp4`,
        ))),
    );
  }

}
