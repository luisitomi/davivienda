export interface FiltroAsiento {
  inicio?: Date;
  fin?: Date;
  origen: number;
  usuario: string;
  estado: string;
  cuenta: string;
}
