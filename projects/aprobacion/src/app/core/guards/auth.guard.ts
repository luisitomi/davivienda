import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private navigationService: NavigationService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.navigationService.setPrevUrl(state.url);
    console.log(route.queryParams.token)

    if (route.queryParams.token != undefined && route.queryParams.token != null) {
      this.authService.setToken(route.queryParams.token);
    } else {
      return false;
    }
    const decoded =  jwtDecode(route.queryParams.token);
    return this.authService.postTsFahObtenerUsuarioWSv2(decoded).pipe(
      map(logged => {
 
        if (logged) {
          return true;
        } else {
          this.router.navigate(['authenticate'], { queryParams: { token: route.queryParams.token } });
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['authenticate'], { queryParams: { token: route.queryParams.token } });
        return of(false);
      })
    );
  }

}
