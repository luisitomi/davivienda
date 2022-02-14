import { ParametrosReporteEjecucionParam } from "./parametros-reporte-ejecucion.model";

export interface ReporteEjecucionParam {
    Id?: number;
    Usuario?: string;
    parametros: Array<ParametrosReporteEjecucionParam>;
 
  }
  