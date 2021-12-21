import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: BehaviorSubject<string> = new BehaviorSubject('https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443');

  constructor() { }

  getApiUrl(): Observable<string> {
    return this.apiUrl.asObservable().pipe(first());
  }
}
