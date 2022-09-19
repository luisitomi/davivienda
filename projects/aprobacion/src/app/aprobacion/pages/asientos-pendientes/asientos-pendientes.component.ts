import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { Asiento } from '../../../shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { ReboteInformationComponent } from '../../components/rebote-information/rebote-information.component';
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
  origenOptionsv2: Array<DropdownItem>;
  usuarioOptions: Array<DropdownItem>;
  cuentaOptions: Array<DropdownItem>;
  estadoOptions: Array<DropdownItem>;
  listFilter: Asiento[] = [];
  asientos: Asiento[] = [];
  asientosCopy: Asiento[] = [];
  loadingAsientos: boolean = false;
  spinner = false;
  nombreUsuario: string;

  


  filtros = {
    inicio: '',
    fin: '',
    origen: '',
    usuario: '',
    estado: '',
    cuenta: '',
    aprobador: 0,
    aprobadorName: '',
  };;
  aprobador: boolean;
  autorizacion: string;
  constructor(
    private snackBar: MatSnackBar,
    private lineHeaderService: LimitHeaderService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private toastr: ToastrService,
    private limitService: LimitService,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {    
    this.authService.getUsuarioV2().subscribe(
      (nombre) => 
      {
        this.nombreUsuario = nombre/*'empleado1'*/ || ''
      }
    );
    this.authService.getToken().subscribe(
      (token) => {
        this.autorizacion = 'Bearer ' + token;
      }
    );
    this.getByRolUser();
  }

   getByRolUser() {
    this.spinner = true;
    const $rol = this.limitService
                  .getByIdRol(this.nombreUsuario)
                   .pipe(finalize( () =>  this.filtrar(this.filtros)))
                  .subscribe(
                    (response: any) => {
                      this.aprobador = Boolean(response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_APROBADOR'));
                      this.spinner = false;
                    }
                  )
    this.arrayToDestroy.push($rol);
  }

   method () {
    this.asientosCopy.sort(function (a, b) {
      return (a.fechaCarga > b.fechaCarga) ? -1 : ((a.fechaCarga < b.fechaCarga) ? 1 : 0) || ('' + b.comprobante).localeCompare(a.comprobante);
    })
    this.spinner = false;
    this.asientos = this.asientosCopy;
  }

  filtrar(filtros: any): void {
    this.loadingAsientos = true;
    this.getListDataFiltros();

    const request = {
      usuarioSesion: this.nombreUsuario,
      aprobador: filtros?.aprobador || '',
      usuario: filtros?.usuario || '',
      fechaCargaInicio: this.datePipe.transform(filtros?.fechaCargaInicio, appConstants.eventDate.format3) || '',
      fechaCargaFin: this.datePipe.transform(filtros?.fechaCargaFin, appConstants.eventDate.format3) || '',
      origen:  filtros?.origen || '',
      tipoComprobante: filtros?.tipoComprobante,
      limitePolitica: filtros?.limitePolitica,
      estado: filtros?.estado || '',
    }
/*
    const request = {
      estado: ((this.aprobador == true)? 'Pendiente Aprobación' : ( filtros?.estado || '')),
      origen: filtros?.origen || '',
      usuario: filtros?.usuario || '',
      fin: this.datePipe.transform(filtros?.fin, appConstants.eventDate.format3) || '',
      inicio: this.datePipe.transform(filtros?.inicio, appConstants.eventDate.format3) || '',
      cuenta: filtros?.cuenta || '',
      aprobador: Number(this.aprobador),
      aprobadorName: this.nombreUsuario,

    } */
    this.spinner = true;
    const $subas = this.lineHeaderService
  
      .getLimitsHeader(request)
      .pipe(finalize(() =>  this.method()))
      .subscribe(
      
       (asiento: LimitHeader[]) => {
          this.asientosCopy = (asiento || []).map((item) => ({
            id: item?.Id,
            origen: item?.Origen,
            fechaCarga: this.ChangeFormateDate(item?.Carga),
            usuario: item?.Usuario,
            comprobante: item?.Comprobante,
            fechaContable: item?.Contable,
            descripcion: item?.Descripcion,
            cargos: Number(item?.Cargo),
            abonos: Number(item?.Abono),
            cuentas: '',
            nivel: item.NivelLimit,
            estado: item?.Estado,
            abonoTotal: Number(item?.AbonoTodo),
            cargoTotal: Number(item?.CargoTodo),
            nivelActual: '',
            aprobador:'' ,
            enviado: '',
            tipoComprobante: item?.TipoComprobante,
            cantidadLineas: item?.CantidadLineas,
            nombrePreparadorN1: item?.NombrePreparadorN1,
            fechayHoraGrabacionPreN1: item?.FechayHoraGrabacionPreN1,
            nombreAprobadorN2: item?.NombreAprobadorN2,
            fechayHoraGrabacionPreN2: item?.FechayHoraGrabacionPreN2,
            nombreAprobadorN3: item?.NombreAprobadorN3,
            fechayHoraGrabacionPreN3: item?.FechayHoraGrabacionPreN3,
            nombreAprobadorN4: item?.NombreAprobadorN4,
            fechayHoraGrabacionPreN4: item?.FechayHoraGrabacionPreN4,
            nombreAprobadorN5: item?.NombreAprobadorN5,
            fechayHoraGrabacionPreN5: item?.FechayHoraGrabacionPreN5,
            mensajeInformativo: item?.MensajeInformativo,
            justificacionRechazo: item?.JustificacionRechazo,
            limitePoliticaContable: item?.LimitePoliticaContable,
            nivelLimit: item?.NivelLimit
          }));
         // this.asientosCopy = this.aprobador ? this.asientosCopy.filter(o => o.estado === 'Pendiente Aprobación') : this.asientosCopy.filter(o => o.usuario === this.nombreUsuario);
   
          this.asientosCopy = this.eliminarObjetosDuplicados(this.asientosCopy, 'id');


        } 
      );
    this.arrayToDestroy.push($subas);
  }

  getListDataFiltros() {

 /*   this.spinner = true;
    const request = {
      estado: ((this.aprobador == true)? 'Pendiente Aprobación' : ('')),
      origen: '',
      usuario: '',
      fin: '',
      inicio:  '',
      cuenta:  '',
      aprobador: Number(this.aprobador),
      aprobadorName: this.nombreUsuario,

    }
    const $subas = this.lineHeaderService
      .getLimitsHeader(request)
    //  .pipe(finalize(() =>  this.setData()))
      .subscribe(
        (asiento: LimitHeader[]) => {

          this.listFilter = (asiento || []).map((item) => ({
            id: item?.Id,
            origen: item?.Origen,
            fechaCarga: this.ChangeFormateDate(item?.Carga),
            usuario: item?.Usuario,
            comprobante: item?.Comprobante,
            fechaContable: item?.Contable,
            descripcion: item?.Descripcion,
            cargos: Number(item?.Cargo),
            abonos: Number(item?.Abono),
            cuentas: item.Cuenta,
            nivel: item.NivelLimit,
            estado: item?.Estado,
            abonoTotal: Number(item?.AbonoTodo),
            cargoTotal: Number(item?.CargoTodo),
            nivelActual: '',
            aprobador:'',
            enviado: ''
          }))
          this.setData(this.listFilter);

          this.spinner = false;
        }
      );
    this.arrayToDestroy.push($subas); */
  }
  setData(listFilter: Asiento[]): void {
    this.origenOptionsv2 = (listFilter || []).map((item) => ({
      label: item?.origen,
      value: item?.origen,
    }))

    this.origenOptionsv2 = this.eliminarObjetosDuplicados(this.origenOptionsv2, 'label');
    this.origenOptionsv2.unshift({label: 'Todos', value: ''});
    this.usuarioOptions = (listFilter || []).map((item) => ({
      label: item?.usuario,
      value: item?.usuario,
    }))
    this.usuarioOptions = this.eliminarObjetosDuplicados(this.usuarioOptions, 'label');
    this.usuarioOptions.unshift({label: 'Todos', value: ''});
    this.cuentaOptions = (listFilter || []).map((item) => ({
      label: item?.cuentas,
      value: item?.cuentas,
    }))
    this.cuentaOptions = this.eliminarObjetosDuplicados(this.cuentaOptions, 'label');
    this.cuentaOptions.unshift({label: 'Todos', value: ''});
    this.estadoOptions = (listFilter || []).map((item) => ({
      label: item?.estado,
      value: item?.estado,
    }))
    this.estadoOptions = this.eliminarObjetosDuplicados(this.estadoOptions, 'label');
    this.estadoOptions.unshift({label: 'Todos', value: ''});
    this.spinner = false;
  }

  ChangeFormateDate(oldDate: any): string{
    if (oldDate.split('-').length === 1) {
      return oldDate.toString().split("/").reverse().join("/").replace('/','-').replace('/','-');
    }
    return oldDate;
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
          Message: '',
          Jwt: this.autorizacion,
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
    const dialogRef = this.dialog.open(ReboteInformationComponent, {
      width: '80%',
      maxWidth: '400px',
      data: null,
      panelClass: 'my-dialog',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.description) {
        asientos.forEach(element => {
          if (element ){
            const request: FiltroAsientoLimit = {
              Usuario: this.nombreUsuario,
              Status: 2,
              Id: element?.id,
              Message: result?.description,
              Jwt: this.autorizacion,
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
    });
  }

  openSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje);
  }
}
