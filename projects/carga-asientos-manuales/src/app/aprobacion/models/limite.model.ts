export interface Limite {
  id: number;
  empiezaCon: string;
  importeMaximo: number;
  codigo: string;
  nuevoValor: number;
  estado: number;
}

export interface Limit {
  Id: number,
  Description: string;
  Value: number;
  Rol: string;
  Estado: number;
}

export interface LimitSave {
  Descripcion: string;
  Valor: number;
  Usuario: string;
}
