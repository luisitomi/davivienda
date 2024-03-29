export interface Carga {
  id: number;
  fechaCarga: Date;
  fechaCargaStr: string;
  fechaCreacionStr: Date;
  origenId: number;
  origen: string;
  nombreArchivo: string;
  estado: string;
  reversado: string;
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
  estadoProceso: string;
  estadoImporting: string;
  estadoAccountingDataSet: string;
}
