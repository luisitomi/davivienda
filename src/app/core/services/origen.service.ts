import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
      switchMap(url => this.http.get<string[]>(url + this.endpoint)),
    );
  }
}
