import { CombinacionContable } from "../../carga-asientos/models/combinacion-contable.model";
import { ReferenciaComplementaria } from "../../carga-asientos/models/referencia-complementaria.model";

export class LineaAsientoInsert {
	Id:number;
	nroLinea:number;
	combinationAccount?: CombinacionContable;
	SegCurrency:string;
	EnteredDebit:string;
	EnteredCredit:string;
	Description:string;
	Usuario:string;
	columnasReferenciales?: ReferenciaComplementaria[];
  }