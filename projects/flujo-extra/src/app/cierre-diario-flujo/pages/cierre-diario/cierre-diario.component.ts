import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { CierreDiarioService } from '../../../core/services/cierre-diario.service';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { FiltroReporte } from '../../../shared/models/filtro-reporte.model';
import { Reporte } from '../../../shared/models/reporte.model';
import { ToastrService } from 'ngx-toastr';

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
    final: '',
  }
  nombreUsuario: string;

  constructor(
    private cierreDiarioService: CierreDiarioService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
  ) {
    super();
    this.authService.getUsuarioV2().subscribe(rpta => this.nombreUsuario = rpta || '');
  }

  ngOnInit(): void {
    this.filtrar(this.filtro);
  }

  filtrar(filtroReporte: FiltroReporte): void {
    const res = new Date();
    const resFinally = new Date();
    res.setDate(filtroReporte.final ? new Date(filtroReporte?.final).getDate() - 31 : res.getDate() - 31)
    resFinally.setDate(filtroReporte.fecha ? new Date(filtroReporte?.fecha).getDate() + 31 : res.getDate())
    filtroReporte.fecha = this.datePipe.transform(filtroReporte.fecha, appConstants.eventDate.format2) || this.datePipe.transform(res, appConstants.eventDate.format2) || '';
    filtroReporte.final = this.datePipe.transform(filtroReporte.final, appConstants.eventDate.format2) || this.datePipe.transform(resFinally, appConstants.eventDate.format2) || '';

    if (filtroReporte.fecha > filtroReporte.final) {
      this.toastr.warning('Fechas para la búsqueda incorrecta', 'Advertencia')
      return;
    }

    const date_1: any = new Date(filtroReporte.fecha);
    const date_2: any = new Date(filtroReporte.final);

    const day_as_milliseconds = 86400000;
    const diff_in_millisenconds = date_2 - date_1;
    const diff_in_days = diff_in_millisenconds / day_as_milliseconds;

    if (diff_in_days > 31) {
      this.toastr.warning('La búsqueda solo se permite máximo 1 mes', 'Advertencia')
      return;
    }

    filtroReporte.fecha = this.datePipe.transform(filtroReporte.fecha, appConstants.eventDate.format) || this.datePipe.transform(res, appConstants.eventDate.format) || '';
    filtroReporte.final = this.datePipe.transform(filtroReporte.final, appConstants.eventDate.format) || this.datePipe.transform(resFinally, appConstants.eventDate.format) || '';


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
