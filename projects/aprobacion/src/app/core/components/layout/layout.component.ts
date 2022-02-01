import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilServices } from '../../../shared/component/general/util.sevice';
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

  nombreUsuario?: string;

  getUsernameSub?: Subscription;

  menuOptions: Menu[] = [
    { texto: 'Infolet', link: 'dashboard/infolet', },
    { texto: 'Control de Salidas', link: 'dashboard/control-salidas', },
    { texto: 'Control de Sincronizaciones', link: 'dashboard/control-sincronizaciones', },
    { texto: 'Cierre Diario', link: 'dashboard/cierre-diario', },
    { texto: 'Nuevo asiento manual', link: 'carga-asientos/nuevo-asiento-manual', },
    { texto: 'Carga manual', link: 'carga-asientos/carga-asientos-manual', },
    { texto: 'Asientos Pendientes', link: 'aprobacion/asientos-pendientes', },
    { texto: 'Configuración de Límites', link: 'aprobacion/configuracion-limites', },
    { texto: 'Control de Interfaces FAH', link: 'interfaces-fah/control-interfaces', },
    { texto: 'Mantenimiento Interfaces', link: 'interfaces-fah/mantenimiento', },
    { texto: 'Mantenimiento Filtros ODI', link: 'filtros-odi/mantenimiento-filtros', },
    { texto: 'Caja IDO vs Saldos FAH', link: 'cuadre-caja/cajaidovssaldosfah' },
    { texto: 'Configuración Cuenta', link: 'cuadre-caja/configuracion-cuenta' },
  ];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private utilServices: UtilServices,
    private cdRef:ChangeDetectorRef,
  ) {
    this.authService.setToken(this.route.snapshot.queryParams.token);
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.utilServices.getTextValue().subscribe(
      (data: any) => {
        if (data) {
          this.title = data;
        } else {
          this.route.firstChild!!.data.subscribe(
            data => this.title = data.title,
          );
        }
      }
    )

    this.getUsernameSub = this.authService.getUsername().subscribe(
      nombre => this.nombreUsuario = nombre,
    );
  }

  ngOnDestroy(): void {
    this.getUsernameSub?.unsubscribe();
  }

}
