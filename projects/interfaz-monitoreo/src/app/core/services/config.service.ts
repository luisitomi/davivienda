import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
//Agregado Inicio
import { ApiService } from './api.service';
//Agregado Fin

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
	//Agregado Inicio
 apiUrl = this.enviroment.apiUrl?.replace(
    /\/$/,
    ''
  );
  //Agregado FIN
  //Comentado inicio
 // apiUrl: BehaviorSubject<string> = new BehaviorSubject('http://rutadelservidor.com');
//Comentado Fin
//Agregado Inicio
apiUrlSubject: BehaviorSubject<string> = new BehaviorSubject(this.apiUrl);
//Agregado Fin
  constructor( private enviroment: ApiService) { }
  
  getApiUrl(): Observable<string> {
	  //
   // return this.apiUrl.asObservable().pipe(first());
	//Agregado Inicio
 // console.log('behavior')
//  console.log(this.apiUrl)
	    return this.apiUrlSubject.asObservable().pipe(first());
		  //Agregado FIN
  }
}
