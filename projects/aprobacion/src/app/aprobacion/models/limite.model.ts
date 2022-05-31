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
  Type: string;
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
  Estado: string;

  Cargo: string;
  Abono: string;
  CargoTodo: string;
  AbonoTodo: string;
  
  Origen: string;
  Cuenta: string;
  NivelActual: string;
  Aprobador: string;
  NivelLimit: number;
}

export interface AccountLine {
  Num: number;
  Dig: number;
  Account: string;
  Name: string;
  Currency: string;
  Debit: number;
  Credit: number;
  Neto: number;
}

export interface AccountDetail {
  Usuario: string;
  Comprobante: string;
  Contable: Date;
  Descripcion: string;
  Origen: string;
}


export interface AccountLineDownload {
  JH_LEDGER_NAME: string;
  JH_JE_SOURCE_NAME: string;
  JH_ACCOUNTING_DATE: string;
  JH_DESCRIPTION: string;
  NRO_LINEA: number;
  JL_SEG_COMPANY: string;
  JL_SEG_GL_ACCOUNT: string;
  JL_SEG_OFICINA: string;
  JL_SEG_SUCURSAL: string;
  JL_SEG_PROYECTO: string;
  JL_SEG_SUBPROYECTO: string;
  JL_SEG_TIPO_COMPROBANTE: string;
  JL_SEG_INTERCOMPANY: string;
  JL_SEG_VINCULADO: string;
  JL_SEG_F1: string;
  JL_SEG_F2: string;
  JL_CURRENCY: string;
  JL_ENTERED_DEBIT: string;
  JL_ENTERED_CREDIT: string;
  JL_DESCRIPTION: string;
  NRO_REF_COM: number;
  JL_REFERENCIA_COM: string;
  VALOR: string;
}

export interface AccountLineDownloadProcess {
  JH_LEDGER_NAME: string;
  JH_JE_SOURCE_NAME: string;
  JH_ACCOUNTING_DATE: string;
  JH_DESCRIPTION: string;
  JL_SEG_COMPANY: string;
  JL_SEG_GL_ACCOUNT: string;
  JL_SEG_OFICINA: string;
  JL_SEG_SUCURSAL: string;
  JL_SEG_PROYECTO: string;
  JL_SEG_SUBPROYECTO: string;
  JL_SEG_TIPO_COMPROBANTE: string;
  JL_SEG_INTERCOMPANY: string;
  JL_SEG_VINCULADO: string;
  JL_SEG_F1: string;
  JL_SEG_F2: string;
  JL_CURRENCY: string;
  JL_ENTERED_DEBIT: string;
  JL_ENTERED_CREDIT: string;
  JL_DESCRIPTION: string;
  JL_REF1: string;
  JL_REF1_VAL: string;
  JL_REF2: string;
  JL_REF2_VAL: string;
  JL_REF3: string;
  JL_REF3_VAL: string;
  JL_REF4: string;
  JL_REF4_VAL: string;
  JL_REF5: string;
  JL_REF5_VAL: string;
  JL_REF6: string;
  JL_REF6_VAL: string;
  JL_REF7: string;
  JL_REF7_VAL: string;
  JL_REF8: string;
  JL_REF8_VAL: string;
  JL_REF9: string;
  JL_REF9_VAL: string;
  JL_REF10: string;
  JL_REF10_VAL: string;
  JL_REF11: string;
  JL_REF11_VAL: string;
  JL_REF12: string;
  JL_REF12_VAL: string;
  JL_REF13: string;
  JL_REF13_VAL: string;
  JL_REF14: string;
  JL_REF14_VAL: string;
  JL_REF15: string;
  JL_REF15_VAL: string;
  JL_REF16: string;
  JL_REF16_VAL: string;
  JL_REF17: string;
  JL_REF17_VAL: string;
  JL_REF18: string;
  JL_REF18_VAL: string;
}
