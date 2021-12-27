import { CabeceraAsientoInsert } from "./cabecera-asiento-insert.model";
import { LineaAsientoInsert } from "./linea-asiento-insert.model";

export interface ManualLading{
    header?: CabeceraAsientoInsert;
    line?: Array<LineaAsientoInsert>;
}