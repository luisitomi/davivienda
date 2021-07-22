export interface Asiento {
  id: number;
  fechaCarga: Date;
  usuario: string;
  comprobante: string;
  fechaContable: Date;
  descripcion: string;
  cargos: number;
  abonos: number;

}
