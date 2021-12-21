import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay, first, map, switchMap, tap } from 'rxjs/operators';
import { Usuario } from 'src/app/shared';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loadUsuarioSub?: Subscription;
  loadingUserData: boolean = false;

  usuario?: Usuario;
  error?: string;

  getPrevSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location,
    private router: Router,
    private navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    const prevUrl = this.navigationService.getPrevUrl();
    this.loadingUserData = true;
    this.route.queryParams.pipe(
      first(),
      map(params => params.token),
      map(token => {
        if (token) {
          return token;
        } else {
          throw new Error('No hay token');
        }
      }),
      tap(token => this.authService.setToken(token)),
      switchMap(token => this.authService.loadUsuario()),
      tap(u => {
        this.usuario = u;
        this.loadingUserData = false;
      }),
      delay(1000),
    ).subscribe(
      res => {
        prevUrl ? this.router.navigateByUrl(prevUrl) : this.location.back();
      },
      err => {
        this.error = err;
        this.loadingUserData = false;
      },
      () => this.loadingUserData = false,
    );
  }

  ngOnDestroy(): void {
    this.getPrevSub?.unsubscribe();
  }

}
