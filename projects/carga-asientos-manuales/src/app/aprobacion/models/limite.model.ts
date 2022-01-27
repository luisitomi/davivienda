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
  ValorFinal: number;
  Usuario: string;
}

export interface LimitEdit {
  Id: number
  Descripcion: string;
  Valor: number;
  ValorFinal: number;
  Usuario: string;
}

export interface LimitHeader
{
  Id: number;
  Carga: Date;
  Usuario: string;
  Comprobante: string;
  Contable: Date;
  Descripcion: string;
  Cargo: string;
  Abono: string;
  Origen: string;
  Cuenta: string;
}

