import { ReporteParam } from "./reporte-param.model";

export interface ReporteLov {
    Id?: number;
    IdLov?:number;  
    NombreLov?: string;
    TipoLov?: number;
    CampoValor?: string;
    CampoKey?: string;
    TablaConsulta?: string;
    QueryWhere?:string;
    Query?: string;
    Usuario: string;
    Estado: string;
  }
  
