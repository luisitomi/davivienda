import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeaturePermission, Features, Permissions, Usuario } from 'src/app/shared';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private authService: AuthService,
  ) { }

  validarPermiso(featurePermissions: FeaturePermission[], feature: Features, permission: Permissions): boolean {
    const feat: FeaturePermission | undefined = featurePermissions.find(f => f.feature === feature && f.permission === permission);
    return feat ? true : false;
  }

  nivelAcceso(fp: FeaturePermission): Observable<boolean> {
    return this.authService.getFeaturePermission().pipe(
      map(fps => fps?.find(f => f.feature === fp.feature && f.permission === fp.permission) ? true : false),
    );
  }
}
