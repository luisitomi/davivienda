export interface Limite {
  id: number;
  importeMaximoNew: number;
  importeMaximo: number;
  codigo: string;
  codigoNew: string;
  nuevoValor: number;
  nuevoValorNew: number;
  estado: number;
  flMensajeInformativo: string;
  flMensajeInformativoOld: string;
}

export interface Limit {
  Id: number,
  Description: string;
  Value: number;
  ValueFinish: number;
  Rol: string;
  Estado: number;
  flMensajeInformativo: string;
  flMensajeInformativoOld: string;
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
  /*
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
  Enviado: string;*/
  Id: number;
  Carga: Date;
  Usuario: string;
  Comprobante: string;
  Contable: Date;
  Descripcion: string;
  Estado: string;
  Abono: string;
  Cargo: string;
  AbonoTodo: string;
  CargoTodo: string;
  Origen: string;
  TipoComprobante: string;
  CantidadLineas: string;
  NombrePreparadorN1: string;
  FechayHoraGrabacionPreN1: string;
  NombreAprobadorN2: string;
  FechayHoraGrabacionPreN2: string;
  NombreAprobadorN3: string;
  FechayHoraGrabacionPreN3: string;
  NombreAprobadorN4: string;
  FechayHoraGrabacionPreN4: string;
  NombreAprobadorN5: string;
  FechayHoraGrabacionPreN5: string;
  MensajeInformativo: string;
  JustificacionRechazo: string;
  LimitePoliticaContable: string;
  NivelLimit: number;
}

export interface LimitHeaderDetailResumen
{
  Comprobante: string;
  Origen: string;
  Contable: Date;
  Descripcion: string;
  Usuario: string;
  Aprobador: string;

  Abono: string;
  Cargo: string;
  Enviado:string;

}
export interface AsientoResumen
{
  origen: string;
  usuario: string;
  comprobante: Date;
  fechaContable: string;
  descripcion: string;
  cargos: string;

  abonos: string;
  aprobador: string;
  enviado:string;

}
/*
export interface LimitHeaderObject
{
  Id: number;
  Carga: Date;
  Usuario: string;
  Comprobante: string;
  Contable: Date;
  Descripcion: string;
  Estado: string;
  Abono: string;
  Cargo: string;
  AbonoTodo: string;
  CargoTodo: string;
  Origen: string;
  TipoComprobante: string;
  CantidadLineas: string;
  NombrePreparadorN1: string;
  FechayHoraGrabacionPreN1: string;
  NombreAprobadorN2: string;
  FechayHoraGrabacionPreN2: string;
  NombreAprobadorN3: string;
  FechayHoraGrabacionPreN3: string;
  NombreAprobadorN4: string;
  FechayHoraGrabacionPreN4: string;
  NombreAprobadorN5: string;
  FechayHoraGrabacionPreN5: string;
  MensajeInformativo: string;
  JustificacionRechazo: string;
  LimitePoliticaContable: string;
  NivelLimit: number;
}
*/
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
  LINEA: string
 /* JH_LEDGER_NAME: string;
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
  JL_REF18_VAL: string; */
}

export interface AccountLineDownloadProcess {
  "LIBRO;ORIGEN;FECHA CONTABLE;DESCRIPCION;COMPANIA;CUENTA CONTABLE;OFICINA;SUCURSAL;PROYECTO;SUBPROYECTO;TIPO COMPROBANTE;INTERCOMPANIA;VINCULADO;FUTURO1;FUTURO2;MONEDA;DEBITO;CREDITO;DESCRIPCION LINEA;REFERENCIA COMPLEMENTARIA 1;VALOR DE REFERENCIA COMPLEMENTARIA 1;REFERENCIA COMPLEMENTARIA 2;VALOR DE REFERENCIA COMPLEMENTARIA 2;REFERENCIA COMPLEMENTARIA 3;VALOR DE REFERENCIA COMPLEMENTARIA 3;REFERENCIA COMPLEMENTARIA 4;VALOR DE REFERENCIA COMPLEMENTARIA 4;REFERENCIA COMPLEMENTARIA 5;VALOR DE REFERENCIA COMPLEMENTARIA 5;REFERENCIA COMPLEMENTARIA 6;VALOR DE REFERENCIA COMPLEMENTARIA 6;REFERENCIA COMPLEMENTARIA 7;VALOR DE REFERENCIA COMPLEMENTARIA 7;REFERENCIA COMPLEMENTARIA 8;VALOR DE REFERENCIA COMPLEMENTARIA 8;REFERENCIA COMPLEMENTARIA 9;VALOR DE REFERENCIA COMPLEMENTARIA 9;REFERENCIA COMPLEMENTARIA 10;VALOR DE REFERENCIA COMPLEMENTARIA 10;REFERENCIA COMPLEMENTARIA 11;VALOR DE REFERENCIA COMPLEMENTARIA 11;REFERENCIA COMPLEMENTARIA 12;VALOR DE REFERENCIA COMPLEMENTARIA 12;REFERENCIA COMPLEMENTARIA 13;VALOR DE REFERENCIA COMPLEMENTARIA 13;REFERENCIA COMPLEMENTARIA 14;VALOR DE REFERENCIA COMPLEMENTARIA 14;REFERENCIA COMPLEMENTARIA 15;VALOR DE REFERENCIA COMPLEMENTARIA 15;REFERENCIA COMPLEMENTARIA 16;VALOR DE REFERENCIA COMPLEMENTARIA 16;REFERENCIA COMPLEMENTARIA 17;VALOR DE REFERENCIA COMPLEMENTARIA 17;REFERENCIA COMPLEMENTARIA 18;VALOR DE REFERENCIA COMPLEMENTARIA 18;VALOR DE AUXILIAR": string;

}
