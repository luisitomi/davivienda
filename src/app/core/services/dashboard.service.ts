import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Infolet } from 'src/app/shared';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  endpoint: string = '/infolets';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getInfolets(): Observable<Infolet[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<Infolet[]>(url + this.endpoint)),
    );
  }

}
