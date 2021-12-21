import { Features, Permissions } from "../enums";

export interface FeaturePermission {
  permission: Permissions;
  feature: Features;
}
