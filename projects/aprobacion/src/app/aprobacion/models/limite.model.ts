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
  Enviado: string;
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
  /*NRO_REF_COM: number;
  JL_REFERENCIA_COM: string;
  VALOR: string;*/

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

export interface AccountLineDownloadProcess {
  "LIBRO": string;
  "ORIGEN": string;
  "FECHA CONTABLE": string;
  "DESCRIPCION": string;
  "COMPANIA": string;
  "CUENTA CONTABLE": string;
  "OFICINA": string;
  "SUCURSAL": string;
  "PROYECTO": string;
  "SUBPROYECTO": string;
  "TIPO COMPROBANTE": string;
  "INTERCOMPANIA": string;
  "VINCULADO": string;
  "FUTURO1": string;
  "FUTURO2": string;
  "MONEDA": string;
  "DEBITO": string;
  "CREDITO": string;
  "DESCRIPCION LINEA": string;
  "REFERENCIA COMPLEMENTARIA 1": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 1": string;
  "REFERENCIA COMPLEMENTARIA 2": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 2": string;
  "REFERENCIA COMPLEMENTARIA 3": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 3": string;
  "REFERENCIA COMPLEMENTARIA 4": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 4": string;
  "REFERENCIA COMPLEMENTARIA 5": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 5": string;
  "REFERENCIA COMPLEMENTARIA 6": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 6": string;
  "REFERENCIA COMPLEMENTARIA 7": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 7": string;
  "REFERENCIA COMPLEMENTARIA 8": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 8": string;
  "REFERENCIA COMPLEMENTARIA 9": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 9": string;
  "REFERENCIA COMPLEMENTARIA 10": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 10": string;
  "REFERENCIA COMPLEMENTARIA 11": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 11": string;
  "REFERENCIA COMPLEMENTARIA 12": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 12": string;
  "REFERENCIA COMPLEMENTARIA 13": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 13": string;
  "REFERENCIA COMPLEMENTARIA 14": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 14": string;
  "REFERENCIA COMPLEMENTARIA 15": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 15": string;
  "REFERENCIA COMPLEMENTARIA 16": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 16": string;
  "REFERENCIA COMPLEMENTARIA 17": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 17": string;
  "REFERENCIA COMPLEMENTARIA 18": string;
  "VALOR DE REFERENCIA COMPLEMENTARIA 18": string;
}
