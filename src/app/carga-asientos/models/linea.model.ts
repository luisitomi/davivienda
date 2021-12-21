import { ReferenciaComplementaria } from "./referencia-complementaria.model";

export interface Linea {
    index: number;
    combinacionContable: string;
    moneda: string;
    debito: number;
    credito: number;
    columnasReferenciales: ReferenciaComplementaria[];
}
