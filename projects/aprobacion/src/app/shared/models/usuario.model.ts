import { FeaturePermission } from "./feature-permission.model";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  permisosACaracteristicas: FeaturePermission[];
}
