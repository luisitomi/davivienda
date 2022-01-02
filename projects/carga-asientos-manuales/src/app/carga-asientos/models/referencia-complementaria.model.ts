export interface ReferenciaComplementaria {
  index: number;
  nombre: string;
  valor: string;
}

export class ReferenceComplementaryRequest {
  origen: string;
  tipoColumna: string;
}