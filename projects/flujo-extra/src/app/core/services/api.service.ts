import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = '';
  listado: string = '';
  listadoPre: string = '';
  cierre: string = '';
  TsFahObtenerUsuarioWS: string = '';

  constructor() { }
}
