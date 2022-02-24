import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = '';
  TsFAHCierreDiarioList: string = '';
  TSFAHCierreDiarioSave: string = '';
  TSFAHCierreDiarioUpdate: string = '';
  TsFahObtenerUsuarioWS: string = '';

  constructor() { }
}
