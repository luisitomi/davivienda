import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { CierreDiarioService } from '../../../core/services/cierre-diario.service';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { FiltroReporte } from '../../../shared/models/filtro-reporte.model';
import { Reporte } from '../../../shared/models/reporte.model';

@Component({
  selector: 'app-cierre-diario',
  templateUrl: './cierre-diario.component.html',
  styleUrls: ['./cierre-diario.component.scss'],
  providers: [DatePipe],

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
    private datePipe: DatePipe,
  ) {
    super();
    this.authService.getUsuarioV2().subscribe(rpta => this.nombreUsuario = rpta || '');
  }

  ngOnInit(): void {
    this.filtrar(this.filtro);
  }

  filtrar(filtroReporte: FiltroReporte) {
    filtroReporte.fecha = this.datePipe.transform(filtroReporte.fecha, appConstants.eventDate.format) || '',
    this.spinner = true;
    const $cierre = this.cierreDiarioService.getListPre().subscribe(res1 => {
      this.cierreDiarioService.getList(filtroReporte).subscribe(res => {
        this.informationsList = res;
        this.spinner = false;
      },
        () => {
          this.spinner = false;
        });
    },
      () => {
        this.spinner = false;
      });
    this.arrayToDestroy.push($cierre);
  }

  cierre(id: number) {
    this.spinner = true;
    const $cierre = this.cierreDiarioService
      .cierreDia(id, this.nombreUsuario)
      .pipe(finalize(() => this.filtrar(this.filtro)))
      .subscribe(res => {
        this.informationsList = res;
        this.spinner = false;
      },
        () => {
          this.spinner = false;
        });
    this.arrayToDestroy.push($cierre);
  }
}
