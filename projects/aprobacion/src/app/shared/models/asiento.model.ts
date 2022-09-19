export interface Asiento {
  id: number;
  origen: string;
  fechaCarga: string;
  usuario: string;
  comprobante: string;
  fechaContable: Date;
  descripcion: string;
  cargos: number;
  abonos: number;
  cuentas: string;
  nivel: number;
  estado: string;
  cargoTotal: number;
  abonoTotal: number;
  nivelActual: string;
  aprobador:string;
  enviado: string;
  
  tipoComprobante: string;
  cantidadLineas: string;
  nombrePreparadorN1: string;
  fechayHoraGrabacionPreN1: string;
  nombreAprobadorN2: string;
  fechayHoraGrabacionPreN2: string;
  nombreAprobadorN3: string;
  fechayHoraGrabacionPreN3: string;
  nombreAprobadorN4: string;
  fechayHoraGrabacionPreN4: string;
  nombreAprobadorN5: string;
  fechayHoraGrabacionPreN5: string;
  mensajeInformativo: string;
  justificacionRechazo: string;
  limitePoliticaContable: string;
  nivelLimit: number;
  
}
