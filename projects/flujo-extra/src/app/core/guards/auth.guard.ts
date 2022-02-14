import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthGenerico } from '../../shared/models/auth.model';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  spinner:boolean;
  auth: AuthGenerico;
  constructor(
    private router: Router,
    private authService: AuthService,
    private navigationService: NavigationService, 
    
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.navigationService.setPrevUrl(state.url);
    return this.authService.isLoggedIn().pipe(
      map(logged => {
      
     //console.log(route.queryParams.token)
     if (route.queryParams.token != undefined && route.queryParams.token != null) {
      const decoded =  jwtDecode(route.queryParams.token); 
     // this.authService.setTokenJson(decoded);
      this.authService.postTsFahObtenerUsuarioWS(decoded).subscribe(rest => {
      //    console.log('getUsuarioV2' +this.authService.getUsuarioV2())
      });
        
     }
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
