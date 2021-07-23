import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrigenService {

  endpoint: string = '/origenes';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getOrigenes(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.endpoint)),
    );
  }
}
