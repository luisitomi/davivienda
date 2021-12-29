import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private permissionService: PermissionService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getFeaturePermission().pipe(
      map(fps => {
        console.log(fps)
        if (fps) {
          return this.permissionService.validarPermiso(fps, route.data.feature, route.data.permission);
        } else {
          return false;
        }

      }),
      catchError(() => {
        return of(false);
      }),
    );
  }

}
