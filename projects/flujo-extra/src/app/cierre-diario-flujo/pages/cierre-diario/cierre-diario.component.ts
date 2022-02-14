import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CierreDiarioService } from '../../../core/services/cierre-diario.service';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { FiltroReporte } from '../../../shared/models/filtro-reporte.model';
import { Reporte } from '../../../shared/models/reporte.model';

@Component({
  selector: 'app-cierre-diario',
  templateUrl: './cierre-diario.component.html',
  styleUrls: ['./cierre-diario.component.scss']
})
export class CierreDiarioComponent extends UnsubcribeOnDestroy {
  displayedColumns: string[] = ['fecha', 'dia', 'accion', 'fechaClose', 'user'];
  spinner  = false;
  loading = false;
  informationsList: Reporte[];
  filtro: FiltroReporte = {
    fecha: '',
  }
  nombreUsuario: string;

  constructor(
    private cierreDiarioService: CierreDiarioService,
    private authService: AuthService,
  ) {
    super();
    this.authService.getUsuarioV2().subscribe(rpta => this.nombreUsuario = rpta || '');
  }

  ngOnInit(): void {
    this.filtrar(this.filtro);
  }

  filtrar(filtroReporte: FiltroReporte) {
    this.spinner = true;
    this.cierreDiarioService.getList(filtroReporte).subscribe(res => {
      this.informationsList = res;
      this.spinner = false;
    },
    ()=> {
      this.spinner = false;
    });
  }

  cierre(id: number) {
    this.spinner = true;
    this.cierreDiarioService.cierreDia(id, this.nombreUsuario).subscribe(res => {
      this.informationsList = res;
      this.spinner = false;
    },
    ()=> {
      this.spinner = false;
    });
  }
}
