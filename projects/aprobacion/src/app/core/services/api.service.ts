import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = '';
  TsFahObtenerUsuarioWS: string = '';

  constructor() { }
}
