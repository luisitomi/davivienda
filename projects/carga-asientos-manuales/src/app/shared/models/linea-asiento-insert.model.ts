import { ReferenciaComplementaria } from "../../carga-asientos/models/referencia-complementaria.model";

export class LineaAsientoInsert {
	Id:number;
	nroLinea:number;
	SegGlAccount:string;
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