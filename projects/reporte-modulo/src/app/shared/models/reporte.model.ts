import { ReporteParam } from "./reporte-param.model";

export interface Reporte {
    Id?: number;
    NombreReporte?: string;
    CodigoReporte?: string;
    RutaReporte: string;
    RutaSalidaFTPS: string;
    NombreArchivo: string;
    CantidadLinea: number;
    Pagina: number;
    CreadoPor: string;
    Extension: string;
    Descripcion: string;
    parametros?: Array<ReporteParam>;
  }
  