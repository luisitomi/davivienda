import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { Cuenta, Oficina, Sucursal } from 'src/app/shared';
import { CuentaContable } from 'src/app/shared/models/cuenta-contable.model';
import { FiltrosSaldos } from '../models/filtros-saldos.model';
import { RegistroCuadre } from '../models/registro-cuadre.model';

@Injectable({
  providedIn: 'root'
})
export class CuadreCajaService {

  sucursalEndpoint: string = '/sucursales';
  oficinaEndpoint: string = '/oficinas';
  cuentaEndpoint: string = '/cuentas-cuadre';
  formatoEndpoint: string = '/formatos';
  registroEndpoint: string = '/registros-cuadre';
  defaultCuentaEndpoint: string = '/cuentapordefault';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  url = 'https://02p-fahlogicapp-d01.azurewebsites.net:443/api/TsSyncOrigenesToAzureWs/triggers/manual/invoke?api-version=2020-05-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5MmNurkZT1uLGTAULkvo4nsVI9tibYfb6iYhAhTinio';
  

  getSucursales(): Observable<Sucursal[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<Sucursal[]>(this.url,{
        "Columnas": "VALUE_NAME, DESCRIPTION_NAME",
        "Tabla": "[xxbol].[TS_FAH_SUCURSAL_ALL]"
    })),
    );
  }

  getCuentaContables(): Observable<CuentaContable[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<CuentaContable[]>(this.url,{
        "Columnas": "VALUE_NAME, DESCRIPTION_NAME",
        "Tabla": "[xxbol].[TS_FAH_CUENTA_ALL]"
    })),
    );
  }
  getOficinas(): Observable<Oficina[]> {


    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<Oficina[]>(this.url,{
        "Columnas": "VALUE_NAME, DESCRIPTION_NAME",
        "Tabla": "[xxbol].[TS_FAH_OFICINA_ALL]"
    })),
    );

  }

  getCuentas(texto: string = ''): Observable<string[]> {
    const params = new HttpParams()
      .set('texto', texto);

    const val =this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<string[]>(this.url,{
        "Columnas": "VALUE_NAME,DESCRIPTION_NAME",
        "Tabla": "[xxbol].[TS_FAH_CUENTA_ALL]"
    })),
    );

    console.log(val)

    return val
  }

  getFormatos(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string[]>(url + this.formatoEndpoint)),
    );
  }

  getRegistrosCuadre(filtrosSaldos: FiltrosSaldos): Observable<RegistroCuadre[]> {
    const params = new HttpParams()
      .set('fecha-corte', moment(filtrosSaldos.fechaCorte).toISOString())
      .set('sucursal', filtrosSaldos.sucursal || '')
      .set('oficina', filtrosSaldos.oficina || '')
      .set('cuenta', filtrosSaldos.cuenta || '');

    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<RegistroCuadre[]>(url + this.registroEndpoint, { params })),
    );
  }

  obtenerCuentaPorDefecto(): Observable<string> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.get<string>(url + this.defaultCuentaEndpoint)),
    );
  }

  guardarCuentaPorDefecto(cuenta: string): Observable<boolean> {
    return this.configService.getApiUrl().pipe(
      switchMap(url => this.http.post<any>(url + this.defaultCuentaEndpoint, { cuenta })),
      map(res => true),
    );
  }

}
