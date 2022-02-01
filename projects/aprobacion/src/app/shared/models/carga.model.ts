export interface Carga {
  id: number;
  fechaCarga: Date;
  origenId: number;
  origen: String;
  nombreArchivo: String;
  estado: String;
  reversado: String;
  jobImportAccounting: number;
  jobCreateAccounting: number;
  cantidadH: number;
  cantidadL: number;
  ultimoProceso: number;
  debitoStage: number;
  creditoStage: number;
  debitoXLA: number;
  creditoXLA: number;
  debitoGL: number;
  creditoGL: number;
}
