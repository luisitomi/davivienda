import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: BehaviorSubject<string> = new BehaviorSubject('http://rutadelservidor.com');

  constructor() { }

  getApiUrl(): Observable<string> {
    return this.apiUrl.asObservable().pipe(first());
  }
}
