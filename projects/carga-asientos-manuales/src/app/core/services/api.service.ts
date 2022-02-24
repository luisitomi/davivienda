import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = '';
  TsFahObtenerUsuarioWS: string = '';
  TsFahGetCuentaContableWS: string = '';
  TsFahGetCompaniaWS: string = '';
  TsFahGetOficinaWS: string = '';
  TsFahGetSucursalWS: string = '';
  TsFahGetProyectoWS: string = '';
  TsFahGetSubproyectoWS: string = '';
  TsFahGetTipoComprobanteWS: string = '';
  TsFahGetIntercompaniaWS: string = '';
  TsFahGetVinculadoWS: string = '';
  TsFahGetFuturo1WS: string = '';
  TsFahGetFuturo2WS: string = '';
  TsFAHCuurencyMoney: string = '';
  validateCliente360: string = '';
  ListReference: string = '';
  urlOrigen: string = '';
  ListPeriod: string = '';
  getLeader: string = '';
  cargarAsientos: string = '';
  saveHeaderLine: string = '';

  constructor() { }
}
