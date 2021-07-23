import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

interface Menu {
  texto: string;
  link: string;
  icono?: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  title: string = '';

  nombreUsuario: string = '';

  loadUsuarioSub?: Subscription;

  menuOptions: Menu[] = [
    { texto: 'Infolet', link: 'dashboard/infolet', },
    { texto: 'Control de Salidas', link: 'dashboard/control-salidas', },
    { texto: 'Control de Sincronizaciones', link: 'dashboard/control-sincronizaciones', },
    { texto: 'Cierre Diario', link: 'dashboard/cierre-diario', },
    { texto: 'Nuevo asiento manual', link: 'carga-asientos/nuevo-asiento-manual', },
    { texto: 'Carga manual', link: 'carga-asientos/carga-asientos-manual', },
    { texto: 'Asientos Pendientes', link: 'aprobacion/asientos-pendientes', },
    { texto: 'Configuración de Límites', link: 'aprobacion/configuracion-limites', },
  ];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadUsuarioSub = this.authService.getUsuario().pipe(
      switchMap(u => u === null ? this.authService.loadUsuario() : of(u))
    ).subscribe(
      u => this.nombreUsuario = u.nombre,
    );

    this.route.firstChild!!.data.subscribe(
      data => this.title = data.title,
    );
  }

  ngOnDestroy(): void {
    this.loadUsuarioSub?.unsubscribe();
  }

}
