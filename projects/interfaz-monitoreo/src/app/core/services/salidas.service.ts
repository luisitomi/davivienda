import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { Salida } from '../../shared';
import { Maestra } from '../../shared/models/maestra.model';
import { TxtLog } from '../../shared/models/txtLog.model';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class SalidasService {

  
  //TsFahOrigenMonitoreoInterfazSalida ="https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/701094b4d4da46078377cda8173daab3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SA8ZcMpHX_1Aey0laSaCmp0WX6hPPS9aKNXFPw9U_CU";
 // TsFahEstadoMonitoreoInterfazSalida = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/c98b5b8b8b67416fa00fb647ee2fc10b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5ChglnE_iJEv5lXY-66cLNW8YA_cQpQqZCYTMvX8sjI";
 // TsMonitoreoInterfazSalidaWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net/workflows/ec929fc542494d8092f4f5d7efcbb52e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2pm8KqYyNP9rqMHYStldx2ybNMiJyQH05uUu9xb3thg";
 // TsFahTxtTraceIntSalLogWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/ba0cc9bb753b49faae8942876bbf36df/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=NYsPwQeKjJlg_Eg2iqsKjMwvyGwuAMwiF5mqSCm9aa8";
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }
/*
  getInterfaces(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.interfazEndpoint)),
    );
  }
*/

getEstados(): Observable<Maestra[]> {
  return this.configService.getApiUrl().pipe(
    first(),
    switchMap(url => this.http.get<Maestra[]>(this.configService.TsFahEstadoMonitoreoInterfazSalida)),
  );
}
/*
  getEstados(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.estadosEndpoint)),
    );
  } */

  getInterfaces(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Maestra[]>(this.configService.TsFahOrigenMonitoreoInterfazSalida)),
    );
  }

  postSalidas(data: any): Observable<Salida[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<Salida[]>(this.configService.TsMonitoreoInterfazSalidaWS,data)),
    );
  }
  postTxtLog(id: any): Observable<TxtLog[]> {
    const data = {Id: id};
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<TxtLog[]>(this.configService.TsFahTxtTraceIntSalLogWS,data)),
    );
  }


  postAnticsrf(): Observable<any> {
    const headers = new HttpHeaders({
      'Sec-Fetch-Site':'none',
      'Sec-Fetch-Mode':'navigate'
    });
   /* const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'
  ,'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
  ,'Access-Control-Max-Age':'3600'
  ,'Access-Control-Allow-Headers':'X-PINGOTHER,Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization'
  ,'Access-Control-Expose-Headers':'xsrf-token'
}); */
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<any>("https://login.microsoftonline.com/common/oauth2/v2.0/token",null)),
    );
  }
  
  postTokenRelay(xsrftoken: string): Observable<any> {
    const headers = new HttpHeaders({'xsrftoken':xsrftoken});
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<any>("https://emtz-dev1.fa.us2.oraclecloud.com/fscmRestApi/tokenrelay",{headers})),
    );
  }
/*
  postTokenAzure(xsrftoken: string): Observable<any> {
    const TenantID = "";
    const Token_Endpoint = `https://login.microsoftonline.com/${TenantID}/oauth2/v2.0/token`;
    const Grant_Type = 'authorization_code';
    const Code = req.body.code;
    const Redirect_Uri = 'http://localhost:8000/give/me/the/code';
    const Client_Id = process.env.CLIENT_ID;
    const Client_Secret = process.env.CLIENT_SECRET;
    const Scope = process.env.SCOPE;

    const headers = new HttpHeaders({'xsrftoken':xsrftoken});
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<any>("https://emtz-dev1.fa.us2.oraclecloud.com/fscmRestApi/tokenrelay",{headers})),
    );
  }
  */
  
/*
  getSalidas(
    interfaz: string = '',
    estado: string = '',
    fechaGenInicio: Date,
    fechaGenFin: Date,
    fechaReadInicio: Date,
    fechaReadFin: Date,
    nombreArchivo: string = '',
  ): Observable<Salida[]> {
    let params = new HttpParams()
      .set('interfaz', interfaz)
      .set('estado', estado)
      .set('fecha-inicio-generacion', moment(fechaGenInicio).toISOString())
      .set('fecha-fin-generacion', moment(fechaGenFin).toISOString())
      .set('fecha-inicio-lectura', moment(fechaReadInicio).toISOString())
      .set('fecha-fin-lectura', moment(fechaReadFin).toISOString())
      .set('nombre-archivo', nombreArchivo);

    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Salida[]>(url + this.salidaEndpoint, { params })),
    );
  }*/

}
