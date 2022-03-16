import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { Maestra } from '../../shared/models/maestra.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EstadosCargaService {

  //TsGobContableEstadoWS: string = 'https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/16d0af3e423643d8a8c814f509a85c12/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cKMC1JVC4Xj_vyEl8G5Oa3TOGbTzUhArkg-KNEraJ_c';
  //TsGobContableTipoCargaWS ="https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/75bbcca454a94c9ab24d0940ba5206dc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CKc2CzC9lpjK8cKFVY0DNIo-I8x5A8TJCgqHhC-rytw";
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  /*getEstados(): Observable<string[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<string[]>(url + this.endpoint)),
    );
  }*/
  getEstados(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Maestra[]>(this.configService.TsGobContableEstadoWS)),
    );
  }
  getTipoCarga(): Observable<Maestra[]> {
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.get<Maestra[]>(this.configService.TsGobContableTipoCargaWS)),
    );
  }
}
