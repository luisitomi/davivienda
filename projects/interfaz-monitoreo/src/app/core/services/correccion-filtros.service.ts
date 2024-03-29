import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap,first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { CorreccionFiltro } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class CorreccionFiltrosService {

  filtros: CorreccionFiltro[] = [];

  filtrosSubject: Subject<CorreccionFiltro[]> = new Subject();

  tipoArchivo: string = "";
  idCarga: number  = 0;
  origen: string = "";
  //TsListarColumnasCorreccionXProcesoWS = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/2c93a2f567274e508b1dcd096853f2d1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=guvktC0yogdu-pQTnQxjDEy_5P8CxEb2RSFqxCvh4po";
  //TsRegistroCorreccionAHCWS  = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/bf1df4448e3647489714a73c37fd5754/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Jp3OiIRwlQUHwhpYS1-glXREmaOgjPGrfu0e5R6ZmIQ";
  //TsEliminarCorreccionAHCWS  = "https://prod-00-02p-fahise-d01-gxwid5k2w6aee.eastus2.environments.microsoftazurelogicapps.net:443/workflows/10f4bb4815324e8d8c827f27ae4b42b4/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=biPMZP5Tk6TCODOGBaBUEb-DDkFK5id7qLy7gcFTgR0";
  constructor( private http: HttpClient,
    private configService: ConfigService,) { }
  getTipoArchivo(){
    return this.tipoArchivo;
  }
  getIdCarga() {
    return this.idCarga;
  }
  getOrigen() {
    return this.origen;
  }
  addValoresCorreccion(nom : any, id: any, origen: any) {
    this.tipoArchivo =nom;
    this.idCarga = id;
    this.origen = origen;
  }
  getFiltros(): Observable<CorreccionFiltro[]> {
    return this.filtrosSubject.asObservable();
  }

  getFiltrosTsListarColumnasCorreccionXProcesoWS (id:any, tipo: string, tipoColumna: any, origen: any): Observable<CorreccionFiltro[]> {
    const obj ={ 
      Id:id,
      TipoFiltro:tipo,
      TipoColumna:tipoColumna,
      Origen: origen
    }
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<CorreccionFiltro[]>(this.configService.TsListarColumnasCorreccionXProcesoWS,obj)),
    );
  }

  postTsRegistroCorreccionAHCWS (obj: any): Observable<CorreccionFiltro[]> {
    
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<CorreccionFiltro[]>(this.configService.TsRegistroCorreccionAHCWS,obj)),
    );
  }

   postTsEliminarCorreccionAHCWS (obj: any): Observable<CorreccionFiltro[]> {
    
    return this.configService.getApiUrl().pipe(
      first(),
      switchMap(url => this.http.post<CorreccionFiltro[]>(this.configService.TsEliminarCorreccionAHCWS,obj)),
    );
  }

  addFiltro(filtro: CorreccionFiltro): void {
    this.filtros.push(filtro);
    this.filtrosSubject.next(this.filtros);
  }

  removeFiltro(filtro: CorreccionFiltro): void {
    this.filtros = this.filtros.filter(f => f !== filtro);
    this.filtrosSubject.next(this.filtros);
  }

  editFiltro(filtro: CorreccionFiltro): void {
    this.filtros = this.filtros.map(f => f.columna === filtro.columna ? filtro : f);
    this.filtrosSubject.next(this.filtros);
  }
}
