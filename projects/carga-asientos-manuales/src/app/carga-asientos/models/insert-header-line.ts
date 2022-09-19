export class InserHeaderLine {
    id:number;
	legderName:string;
	sourceName:string;
	trxNumber:string;
	accountingDate:string;
	description:string;
	usuario:string;
	Jwt:string;
    linea: Array<LineSave>;
}

export class LineSave {
    id?: number;
	nroLinea?: number;
	company?: string;
	segGlAccount?: string;
	segGlAccountValue?: string;
	segOficina?: string;
	segSucursal?: string;
	segProyecto?: string;
	segSubProyecto?: string;
	segTipoComprobante?: string;
	segIntecompany?: string;
	segVinculado?: string;
	segF1?: string;
	segF2?: string;
	segCurrency?: string;
    enteredDebit?: string;
	enteredCredit?: string;
	description?: string;
	usuario?: string;
    informacionReferencial?: Array<ItemsLine>;
	nameSucursal: string;
	nameOficina: string;
	validacionReglaCuenta: string;
}

export class ItemsLine {
    nroRefCom: number;
    referenciaComprobante: string;
	referenciaComprobanteValue: string;
    valor: string;
}