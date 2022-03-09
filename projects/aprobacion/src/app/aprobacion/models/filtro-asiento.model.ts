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
}

