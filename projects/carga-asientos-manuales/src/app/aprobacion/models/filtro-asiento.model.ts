export interface FiltroAsiento {
  inicio?: string;
  fin?: string;
  origen: string;
  usuario: string;
  estado: string;
  cuenta: string;
}

export interface FiltroAsientoLimit {
  Id: number;
  Cuenta: string;
  Usuario: string;
  Status: number;
}

