import { Cuenta } from "./cuenta.model";

export interface Asiento {
  id: number;
  origen: string;
  fechaCarga: Date;
  usuario: string;
  comprobante: string;
  fechaContable: Date;
  descripcion: string;
  cargos: number;
  abonos: number;
  cuentas?: Cuenta[];
}
