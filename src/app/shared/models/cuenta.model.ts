export interface Cuenta {
  primerDigito: number;
  VALUE_NAME: string;
  DESCRIPTION_NAME: string;
  moneda: string;
  debito: number;
  credito: number;
  neto: number;
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
