export interface Filtro {
  id: number;
  fuente: string;
  valores: string;
  tipo: string;
  campo: string;
  oldFuente?: string;
  oldValores?: string;
  oldTipo?: string;
  oldCampo?: string;
}
