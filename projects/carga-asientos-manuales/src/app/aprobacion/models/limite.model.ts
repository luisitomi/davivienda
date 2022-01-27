export interface Limite {
  id: number;
  importeMaximoNew: number;
  importeMaximo: number;
  codigo: string;
  codigoNew: string;
  nuevoValor: number;
  nuevoValorNew: number;
  estado: number;
}

export interface Limit {
  Id: number,
  Description: string;
  Value: number;
  ValueFinish: number;
  Rol: string;
  Estado: number;
}

export interface LimitSave {
  Descripcion: string;
  Valor: number;
  Usuario: string;
}

export interface LimitEdit {
  Id: number
  Descripcion: string;
  Valor: number;
  Usuario: string;
}

