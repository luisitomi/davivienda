import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { Asiento } from '../../../shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { FiltroAsientoLimit } from '../../models/filtro-asiento.model';
import { LimitHeader } from '../../models/limite.model';
import { LimitService } from '../../services/limit.service';
import { LimitHeaderService } from '../../services/limitHeader.service';

@Component({
  selector: 'app-asientos-pendientes',
  templateUrl: './asientos-pendientes.component.html',
  styleUrls: ['./asientos-pendientes.component.scss'],
  providers: [DatePipe],
})
export class AsientosPendientesComponent extends UnsubcribeOnDestroy implements OnInit {
  asientos: Asiento[] = [];
  loadingAsientos: boolean = false;
  spinner = false;
  nombreUsuario: string;
  filtros = null;
  aprobador: boolean;

  constructor(
    private snackBar: MatSnackBar,
    private lineHeaderService: LimitHeaderService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private toastr: ToastrService,
    private limitService: LimitService,
  ) {
    super();
    const getUsernameSub = this.authService.getUsuarioV2().subscribe(
      nombre => this.nombreUsuario = nombre || '',
    );
    this.arrayToDestroy.push(getUsernameSub);
  }

  ngOnInit(): void {
    this.getByRolUser();
  }

  getByRolUser(): void {
    this.spinner = true;
    const $rol = this.limitService
                  .getByIdRol(this.nombreUsuario)
                  .pipe(finalize(() => this.filtrar(this.filtros)))
                  .subscribe(
                    (response: any) => {
                      this.aprobador = response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_APROBADOR');
                    }
                  )
    this.arrayToDestroy.push($rol);
  }

  method () : void {
    this.asientos = this.aprobador ? this.asientos : this.asientos.filter(o => o.usuario === this.nombreUsuario);
    this.loadingAsientos = false
    this.spinner = false
  }

  filtrar(filtros: any): void {
    let request = {};
    this.loadingAsientos = true;
    if (filtros) {
      request = {
        estado: filtros?.estado || '',
        origen: filtros?.origen || '',
        usuario: filtros?.usuario || '',
        fin: this.datePipe.transform(filtros?.fin, appConstants.eventDate.format2) || '',
        inicio: this.datePipe.transform(filtros?.inicio, appConstants.eventDate.format2) || '',
        cuenta: filtros?.cuenta || '',
      }
    }
    this.spinner = true;
    const $subas = this.lineHeaderService
      .getLimitsHeader(request || filtros)
      .pipe(finalize(() => this.method()))
      .subscribe(
        (asiento: LimitHeader[]) => {
          this.asientos = (asiento || []).map((item) => ({
            id: item?.Id,
            origen: item?.Origen,
            fechaCarga: item?.Carga,
            usuario: item?.Usuario,
            comprobante: item?.Comprobante,
            fechaContable: item?.Contable,
            descripcion: item?.Descripcion,
            cargos: Number(item?.Cargo),
            abonos: Number(item?.Abono),
            cuentas: item.Cuenta,
            nivel: item.NivelLimit,
            estado: item?.Estado,
          }));
          this.asientos = this.eliminarObjetosDuplicados(this.asientos, 'id');
        }
      );
    this.arrayToDestroy.push($subas);
  }

  eliminarObjetosDuplicados(arr: any, prop: any) {
    var nuevoArray = [];
    var lookup: any  = {};

    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }

    for (i in lookup) {
        nuevoArray.push(lookup[i]);
    }

    return nuevoArray;
}

  aprobar(asientos: Asiento[]): void {
    asientos.forEach(element => {
      if (element ){
        const request: FiltroAsientoLimit = {
          Usuario: this.nombreUsuario,
          Status: 1,
          Id: element?.id,
        }
        this.spinner = true;
        const $subas = this.lineHeaderService
          .saveStatusAsient(request)
          .pipe(finalize(() => this.spinner = false))
          .subscribe(
            (response: any) => {
              if(response?.status === appConstants.responseStatus.OK) {
                this.toastr.success(response?.message, 'Aprobado');
                this.filtrar(this.filtros);
              }          
            }
          );
        this.arrayToDestroy.push($subas);
      }
    });
  }

  rechazar(asientos: Asiento[]): void {
    asientos.forEach(element => {
      if (element ){
        const request: FiltroAsientoLimit = {
          Usuario: this.nombreUsuario,
          Status: 2,
          Id: element?.id,
        }
        this.spinner = true;
        const $subas = this.lineHeaderService
          .saveStatusAsient(request)
          .pipe(finalize(() => this.spinner = false))
          .subscribe(
            (response: any) => {
              if(response?.status === appConstants.responseStatus.OK) {
                this.toastr.success(response?.message, 'Rechazado');
                this.filtrar(this.filtros);
              }          
            }
          );
        this.arrayToDestroy.push($subas);
      }
    });
  }

  openSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje);
  }

}
