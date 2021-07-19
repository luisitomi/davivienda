import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  nombreUsuario: string = '';

  loadUsuarioSub?: Subscription;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadUsuarioSub = this.authService.getUsuario().pipe(
      switchMap(u => u === null ? this.authService.loadUsuario() : of(u))
    ).subscribe(
      u => this.nombreUsuario = u.nombre,
    );
  }

  ngOnDestroy(): void {
    this.loadUsuarioSub?.unsubscribe();
  }

}
