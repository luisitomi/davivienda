import { CabeceraAsiento } from "./cabecera-asiento.model";
import { Linea } from "./linea.model";

export interface Asiento {
  cabecera: CabeceraAsiento;
  lineas: Linea[];
}
