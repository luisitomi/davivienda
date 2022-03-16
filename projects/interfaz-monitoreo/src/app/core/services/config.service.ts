import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
//Agregado Inicio
import { ApiService } from './api.service';
//Agregado Fin

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
	//Agregado Inicio
 apiUrl = this.enviroment.apiUrl?.replace(
    /\/$/,
    ''
  );

  TsMonitoreoInterfazSalidaWS = this.enviroment.TsMonitoreoInterfazSalidaWS?.replace(
    /\/$/,
    ''
  );
TsGobContableEstadoWS = this.enviroment.TsGobContableEstadoWS?.replace(
    /\/$/,
    ''
  );
TsGobContableTipoCargaWS = this.enviroment.TsGobContableTipoCargaWS?.replace(
    /\/$/,
    ''
  );
TsFahTxtTraceIntSalLogWS = this.enviroment.TsFahTxtTraceIntSalLogWS?.replace(
    /\/$/,
    ''
  );
TsFAHReprocesarCargaGobIntContableWS = this.enviroment.TsFAHReprocesarCargaGobIntContableWS?.replace(
    /\/$/,
    ''
  );
TsGetGobiernoInterfacesSalidaPorIdWS = this.enviroment.TsGetGobiernoInterfacesSalidaPorIdWS?.replace(
    /\/$/,
    ''
  );
TsFahEstadoMonitoreoInterfazSalida = this.enviroment.TsFahEstadoMonitoreoInterfazSalida?.replace(
    /\/$/,
    ''
  );
TsRegistroCorreccionAHCWS = this.enviroment.TsRegistroCorreccionAHCWS?.replace(
    /\/$/,
    ''
  );
TsFahCorreccionRegistrosWS = this.enviroment.TsFahCorreccionRegistrosWS?.replace(
    /\/$/,
    ''
  );
TsAnnouncementsTokenWS = this.enviroment.TsAnnouncementsTokenWS?.replace(
    /\/$/,
    ''
  );
TsGobiernoInterfacesSalida = this.enviroment.TsGobiernoInterfacesSalida?.replace(
    /\/$/,
    ''
  );
TsEliminarCorreccionAHCWS = this.enviroment.TsEliminarCorreccionAHCWS?.replace(
    /\/$/,
    ''
  );
TsFahInfoletPorOrigenWS = this.enviroment.TsFahInfoletPorOrigenWS?.replace(
    /\/$/,
    ''
  );
TsCalcularCantidadRegistrosWS = this.enviroment.TsCalcularCantidadRegistrosWS?.replace(
    /\/$/,
    ''
  );
TsModificarRegistrosTMPGobIntSalWS = this.enviroment.TsModificarRegistrosTMPGobIntSalWS?.replace(
    /\/$/,
    ''
  );
TsFAHListarInfoletWS = this.enviroment.TsFAHListarInfoletWS?.replace(
    /\/$/,
    ''
  );
TsFahColumnaProcesoAHCWS = this.enviroment.TsFahColumnaProcesoAHCWS?.replace(
    /\/$/,
    ''
  );
TsListarColumnasCorreccionXProcesoWS = this.enviroment.TsListarColumnasCorreccionXProcesoWS?.replace(
    /\/$/,
    ''
  );
TsFAHReversaCargaGobIntContableWS = this.enviroment.TsFAHReversaCargaGobIntContableWS?.replace(
    /\/$/,
    ''
  );
TsFahOrigenMonitoreoInterfazSalida = this.enviroment.TsFahOrigenMonitoreoInterfazSalida?.replace(
    /\/$/,
    ''
  );
  TsFahObtenerUsuarioWS = this.enviroment.TsFahObtenerUsuarioWS?.replace(
    /\/$/,
    ''
  );
  TsFahObtenerRolesPorUsuarioWS = this.enviroment.TsFahObtenerRolesPorUsuarioWS?.replace(
    /\/$/,
    ''
  );

  TsFAHOrigenCargaContableWS = this.enviroment.TsFAHOrigenCargaContableWS?.replace(
    /\/$/,
    ''
  );

  TsFahActualizarEstadosJobMonitoreoCargasWS = this.enviroment.TsFahActualizarEstadosJobMonitoreoCargasWS?.replace(
    /\/$/,
    ''
  );

  //Agregado FIN
  //Comentado inicio
 // apiUrl: BehaviorSubject<string> = new BehaviorSubject('http://rutadelservidor.com');
//Comentado Fin
//Agregado Inicio
apiUrlSubject: BehaviorSubject<string> = new BehaviorSubject(this.apiUrl);

TsMonitoreoInterfazSalidaWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsMonitoreoInterfazSalidaWS);
TsGobContableEstadoWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsGobContableEstadoWS);
TsGobContableTipoCargaWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsGobContableTipoCargaWS);
TsFahTxtTraceIntSalLogWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFahTxtTraceIntSalLogWS);
TsFAHReprocesarCargaGobIntContableWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFAHReprocesarCargaGobIntContableWS);
TsGetGobiernoInterfacesSalidaPorIdWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsGetGobiernoInterfacesSalidaPorIdWS);
TsFahEstadoMonitoreoInterfazSalidaUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFahEstadoMonitoreoInterfazSalida);
TsRegistroCorreccionAHCWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsRegistroCorreccionAHCWS);
TsFahCorreccionRegistrosWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFahCorreccionRegistrosWS);
TsAnnouncementsTokenWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsAnnouncementsTokenWS);
TsGobiernoInterfacesSalidaUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsGobiernoInterfacesSalida);
TsEliminarCorreccionAHCWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsEliminarCorreccionAHCWS);
TsFahInfoletPorOrigenWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFahInfoletPorOrigenWS);
TsCalcularCantidadRegistrosWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsCalcularCantidadRegistrosWS);
TsModificarRegistrosTMPGobIntSalWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsModificarRegistrosTMPGobIntSalWS);
TsFAHListarInfoletWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFAHListarInfoletWS);
TsFahColumnaProcesoAHCWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFahColumnaProcesoAHCWS);
TsListarColumnasCorreccionXProcesoWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsListarColumnasCorreccionXProcesoWS);
TsFAHReversaCargaGobIntContableWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFAHReversaCargaGobIntContableWS);
TsFahOrigenMonitoreoInterfazSalidaUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFahOrigenMonitoreoInterfazSalida);


TsFahObtenerUsuarioWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFahObtenerUsuarioWS);
TsFahObtenerRolesPorUsuarioWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFahObtenerRolesPorUsuarioWS);
TsFAHOrigenCargaContableWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFAHOrigenCargaContableWS);

TsFahActualizarEstadosJobMonitoreoCargasWSUrlSubject : BehaviorSubject<string> = new BehaviorSubject(this.TsFahActualizarEstadosJobMonitoreoCargasWS);
//Agregado Fin
  constructor( private enviroment: ApiService) { }
  
  getApiUrl(): Observable<string> {
	  //
   // return this.apiUrl.asObservable().pipe(first());
	//Agregado Inicio
 // console.log('behavior')
//  console.log(this.apiUrl)
	    return this.apiUrlSubject.asObservable().pipe(first());
		  //Agregado FIN
  }
}
