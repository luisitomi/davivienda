export interface Interfaz {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  periodicidad: string;
  oldEstado?: string;
  oldPeriodo?: string;
}
