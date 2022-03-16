import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { CorreccionColumna } from '../../shared';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CorreccionColumnasService {

  columnas: CorreccionColumna[] = [];
 // TsListarColumnasCorreccionXProcesoWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/2c93a2f567274e508b1dcd096853f2d1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=guvktC0yogdu-pQTnQxjDEy_5P8CxEb2RSFqxCvh4po";
  //TsRegistroCorreccionAHCWS  = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/bf1df4448e3647489714a73c37fd5754/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Jp3OiIRwlQUHwhpYS1-glXREmaOgjPGrfu0e5R6ZmIQ";
  
  columnasSubject: Subject<CorreccionColumna[]> = new Subject();
  tipoArchivo: string = "";
  idCarga: number  = 0;
  origen: string = "";
  constructor(private http: HttpClient,
    private configService: ConfigService,) { }
  getTipoArchivo(){
    return this.tipoArchivo;
  }
  addTipoArchivo(nom : any) {
    this.tipoArchivo =nom;
  }
  getIdCarga() {
    return this.idCarga;
  }
  getOrigen(){
    return this.origen;
  }
  addValoresCorreccion(nom : any, id: any,origen: any) {
    this.tipoArchivo =nom;
    this.idCarga = id;
    this.origen = origen;
  }

  getColumnas(): Observable<CorreccionColumna[]> {
    return this.columnasSubject.asObservable();
  }
  getFiltrosTsListarColumnasCorreccionXProcesoWS (id:any, tipo: string, tipoColumna: any, origen: any): Observable<CorreccionColumna[]> {
    const obj ={ 
      Id:id,
      TipoFiltro:tipo,
      TipoColumna:tipoColumna,
      Origen: origen
    }
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<CorreccionColumna[]>(this.configService.TsListarColumnasCorreccionXProcesoWS,obj)),
    );
  }

  postTsRegistroCorreccionAHCWS (obj: any): Observable<CorreccionColumna[]> {
    
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<CorreccionColumna[]>(this.configService.TsRegistroCorreccionAHCWS,obj)),
    );
  }

  
  addColumna(columna: CorreccionColumna): void {
    this.columnas.push(columna);
    this.columnasSubject.next(this.columnas);
  }

  removeColumna(columna: CorreccionColumna): void {
    this.columnas = this.columnas.filter(c => c !== columna);
    this.columnasSubject.next(this.columnas);
  }

  editColumna(columna: CorreccionColumna): void {
    this.columnas = this.columnas.map(c => c.columna === columna.columna ? columna : c);
    this.columnasSubject.next(this.columnas);
  }
}
