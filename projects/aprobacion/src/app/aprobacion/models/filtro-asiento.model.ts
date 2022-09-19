export interface FiltroAsiento {
  inicio?: string;
  fin?: string;
  origen: string;
  usuario: string;
  estado: string;
  cuenta: string;
  aprobador: number;
  aprobadorName: string;
}

export interface FiltroAsientoLimit {
  Id: number;
  Usuario: string;
  Status: number;
  Message: string;
  Jwt: string;
}


export interface FiltroAsientoLimitHeader {
  usuarioSesion?: string;
  aprobador?: string;
  usuario: string;
  fechaCargaInicio: string;
  fechaCargaFin: string;
  origen: string;
  tipoComprobante: string;
  limitePolitica: string;
  estado: string;
}

