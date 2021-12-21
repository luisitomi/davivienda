import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Infolet } from 'src/app/shared';

@Component({
  selector: 'app-infolet-origen',
  templateUrl: './infolet-origen.component.html',
  styleUrls: ['./infolet-origen.component.scss']
})
export class InfoletOrigenComponent implements OnInit, OnDestroy {

  title: string = '';

  @Input() infolet?: Infolet;

  getTokenSub?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.title = this.infolet?.origen !== undefined ? 'Infolet de Origen' : 'Infolet Global de Integración';
  }

  ngOnDestroy(): void {
    this.getTokenSub?.unsubscribe();
  }

  goDetalle(): void {
    this.getTokenSub = this.authService.getToken().subscribe(token => {
      const url: string = this.router.serializeUrl(this.router.createUrlTree(['/dashboard/controlymonitoreo'], {
        queryParams: { origen: this.infolet?.origenId, token },
      }));
      window.open(url);
    });
  }

}
