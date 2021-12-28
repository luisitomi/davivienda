import { CombinacionContable } from "../../carga-asientos/models/combinacion-contable.model";
import { ReferenciaComplementaria } from "../../carga-asientos/models/referencia-complementaria.model";

export class LineaAsientoInsert {
	Id:number;
	nroLinea:number;
	SegGlAccount?: CombinacionContable;
	SegOficina:string;
	SegSucursal:string;
	SegProyecto:string;
	SegSubProyecto:string;
	SegTipoComprobante:string;
	SegIntecompany:string;
	SegVinculado:string;
	SegF1:string;
	SegF2:string;
	SegCurrency:string;
	EnteredDebit:string;
	EnteredCredit:string;
	Description:string;
	Usuario:string;
	columnasReferenciales?: ReferenciaComplementaria[];
  }