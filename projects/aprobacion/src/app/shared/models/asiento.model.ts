export interface Asiento {
  id: number;
  origen: string;
  fechaCarga: string;
  usuario: string;
  comprobante: string;
  fechaContable: Date;
  descripcion: string;
  cargos: number;
  abonos: number;
  cuentas: string;
  nivel: number;
  estado: string;
  cargoTotal: number;
  abonoTotal: number;
}
