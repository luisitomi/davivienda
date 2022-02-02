import { ReferenciaComplementaria } from "./referencia-complementaria.model";

export interface Linea {
    index: number;
    combinacionContable: string;
    moneda: string;
    debito: number;
    credito: number;

    compania: string,
    cuentaContable:string,
    oficina:string,
    sucursal:string,
    proyecto:string,
    subproyecto:string,
    tipoComprobante: string,
    intecompania: string,
    vinculado: string,
    futuro1: string,
    futuro2:string,

    requiereIdentificacionCliente: string,
    requiereAuxiliarConciliacion: string,


    columnasReferenciales: ReferenciaComplementaria[];
}
