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
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

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
  informationsList: MatTableDataSource<Reporte> = new MatTableDataSource();
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
    private dialog: MatDialog,
  ) {
    super();
    this.authService.getUsuarioV2().subscribe(rpta => this.nombreUsuario = rpta || '');
  }

  ngOnInit(): void {
    this.filtrar(this.filtro);
  }

  filtrar(filtroReporte: FiltroReporte): void {
    filtroReporte.fecha = this.datePipe.transform(filtroReporte.fecha, appConstants.eventDate.format3) || this.datePipe.transform(new Date().setDate(-1), appConstants.eventDate.format3) || '';
    filtroReporte.final = this.datePipe.transform(filtroReporte.final, appConstants.eventDate.format3) || this.datePipe.transform(new Date(), appConstants.eventDate.format3) || '';

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

    this.spinner = true;
    this.informationsList.data = [];
    const $cierre = this.cierreDiarioService.getListPre().subscribe(res1 => {
      this.cierreDiarioService.getList(filtroReporte).subscribe(res => {
        this.informationsList.data = res;
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

  cierre(element: any) {
    console.log(element)
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { name: `¿Esta seguro que desea cerrar la fecha ${element?.Fecha}`},
      panelClass: 'my-dialog',
       disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.spinner = true;
        const $cierre = this.cierreDiarioService
          .cierreDia(element?.id, this.nombreUsuario)
          .pipe(finalize(() => this.filtrar(this.filtro)))
          .subscribe(res => {
            this.spinner = false;
          },
            () => {
              this.spinner = false;
            });
        this.arrayToDestroy.push($cierre);
      }
    });
  }
}
