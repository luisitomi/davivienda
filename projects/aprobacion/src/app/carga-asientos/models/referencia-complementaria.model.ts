export interface ReferenciaComplementaria {
  index: number;
  nombre: string;
  nombreValue: string;
  valor: string;
}

export class ReferenceComplementaryRequest {
  origen: string;
  tipoColumna: string;
}