import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = '';
  listado: string = '';
  cierre: string = '';
  TsFahObtenerUsuarioWS: string = '';

  constructor() { }
}
