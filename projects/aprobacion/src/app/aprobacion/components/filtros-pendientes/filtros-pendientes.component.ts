import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { finalize } from 'rxjs/operators';
import { Maestra } from '../../../carga-asientos/models/maestra.model';
import { AuthService } from '../../../core/services/auth.service';
import { Asiento, Origen } from '../../../shared';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { FiltroAsiento, FiltroAsientoLimitHeader } from '../../models/filtro-asiento.model';
import { LimitHeader } from '../../models/limite.model';
import { LimitService } from '../../services/limit.service';
import { LimitHeaderService } from '../../services/limitHeader.service';

@Component({
  selector: 'app-filtros-pendientes',
  templateUrl: './filtros-pendientes.component.html',
  styleUrls: ['./filtros-pendientes.component.scss'],
})
export class FiltrosPendientesComponent extends UnsubcribeOnDestroy implements OnInit {
  @Input() asientos: Asiento[] = [];
   origenOptions: Array<DropdownItem>;
   usuarioOptions: Array<DropdownItem>;
   cuentaOptions: Array<DropdownItem>;
  estadoOptions: Array<DropdownItem>;
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;
  listFilter: Asiento[];
  @Output() filtros = new EventEmitter<FiltroAsiento>();
  filtrosForm: FormGroup;

  aprobadoresOptions: Array<DropdownItem>;
  tipoComprobanteOptions: Array<DropdownItem>;
  LimitePoliticaOptions: Array<DropdownItem>;
//  origenOptions: Array<DropdownItem>;
 // usuarioOptions: Array<DropdownItem>;
 // cuentaOptions: Array<DropdownItem>;
 // estadoOptions: Array<DropdownItem>;
  spinner: boolean;
  filtrosData: FiltroAsientoLimitHeader = {
    usuarioSesion: '',
    aprobador: '',
    usuario: '',
    fechaCargaInicio: '',
    fechaCargaFin: '',
    origen:  '',
    tipoComprobante: '',
    limitePolitica: '',
    estado: ''
  };
  nombreUsuario: string;
  isAprobad: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private lineHeaderService: LimitHeaderService,
    private authService: AuthService,
    private limitService: LimitService,
  ) {
    super();
  }
  
  ngOnInit() {
    this.authService.getUsuarioV2().subscribe(
      (nombre) => 
      {
        this.nombreUsuario = nombre || ''
      }
    );
    this.getByRolUser();
    this.getPreparador();
    this.getAprobadores();
    this.getLimitePolitica();
    this.getTipoComprobante();
    this.getEstado();
    this.getOrigen();
    this.createForm();
  }
  getPreparador() {
    this.spinner = true;
    const $rol = this.lineHeaderService
                  .getTsFahGetAprobacionPreparadorFiltroWS()
                  .pipe(finalize( () =>  this.spinner = false))
                  .subscribe(
                    (response: Maestra[]) => {
                  
          this.usuarioOptions = (response || []).map((item) => ({
            label: item?.valor,
            value: item?.codigo,
          }))
          this.usuarioOptions.unshift({label: 'Todos', value: ''});
          this.spinner = false;
        }
        )
    this.arrayToDestroy.push($rol);
  }
  getAprobadores() {
    this.spinner = true;
    const $rol = this.lineHeaderService
                  .getTsFahGetAprobacionAprobadoresFiltroWS()
                  .pipe(finalize( () =>  this.spinner = false))
                  .subscribe(
                    (response: Maestra[]) => {
                  
          this.aprobadoresOptions = (response || []).map((item) => ({
            label: item?.valor,
            value: item?.codigo,
          }))
          this.aprobadoresOptions.unshift({label: 'Todos', value: ''});
          this.spinner = false;
        }
        )
    this.arrayToDestroy.push($rol);
  }

  getLimitePolitica() {
    this.spinner = true;
    const $rol = this.lineHeaderService
                  .getTsFahGetAprobacionPoliticaLimiteFiltroWS()
                  .pipe(finalize( () =>  this.spinner = false))
                  .subscribe(
                    (response: Maestra[]) => {
                  
          this.LimitePoliticaOptions = (response || []).map((item) => ({
            label: item?.valor,
            value: item?.valor,
          }))
          this.LimitePoliticaOptions.unshift({label: 'Todos', value: ''});
          this.spinner = false;
        }
        )
    this.arrayToDestroy.push($rol);
  }
  getTipoComprobante() {
    this.spinner = true;
    const $rol = this.lineHeaderService
                  .getTsFahGetAprobacionTipoComprobanteFiltroWS()
                  .pipe(finalize( () =>  this.spinner = false))
                  .subscribe(
                    (response: Maestra[]) => {
                  
          this.tipoComprobanteOptions = (response || []).map((item) => ({
            label: item?.valor,
            value: item?.codigo,
          }))
          this.tipoComprobanteOptions.unshift({label: 'Todos', value: ''});
          this.spinner = false;
                    }
                  )
    this.arrayToDestroy.push($rol);
  }
  getEstado() {
    this.spinner = true;
    const $rol = this.lineHeaderService
                  .getTsFahGetAprobacionEstadoFiltroWS()
                  .pipe(finalize( () =>  this.spinner = false))
                  .subscribe(
                    (response: Maestra[]) => {
                  
          this.estadoOptions = (response || []).map((item) => ({
            label: item?.valor,
            value: item?.valor,
          }))
          this.estadoOptions.unshift({label: 'Todos', value: ''});
          this.spinner = false;
                    }
                  )
    this.arrayToDestroy.push($rol);
  }
  getOrigen() {
    this.spinner = true;
    const $rol = this.lineHeaderService
                  .getTsFAHOrigenCargaContableWS()
                  .pipe(finalize( () =>  this.spinner = false))
                  .subscribe(
                    (response: Origen[]) => {
                  
          this.origenOptions = (response || []).map((item) => ({
            label: item?.ORIGEN,
            value: item?.ORIGEN,
          }))
          this.origenOptions.unshift({label: 'Todos', value: ''});
          this.spinner = false;
                    }
                  )
    this.arrayToDestroy.push($rol);
  }
/*
  filterForm = new FormGroup({
    origen: new FormControl(0),
    estado: new FormControl(''),
    despuesDe: new FormControl(new Date()),
    antesDe: new FormControl(new Date()),
    jobId: new FormControl(''),
    nombreArchivo: new FormControl(''),
    tipoCarga: new FormControl(''),
  });
*/
  createForm(): void {
    this.filtrosForm = this.formBuilder.group({
      fechaCargaInicio: [null, []],
      fechaCargaFin: [null, []],
      aprobador: [null, []],
      usuario: [null, []],
      origen: [null, []],
      tipoComprobante: [null, []],
      limitePolitica: [null, []],
      estado: [null, []],
    });
    this.filtrosForm.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.filtrosForm.invalid);
    });
  }

  filtrar(): void {
    this.filtros.emit(this.filtrosForm.value);
    this.panel?.close();
  }

  onFocusOutEvent(control: string) {
    this.filtrosForm.get(`${control}`)?.clearValidators();
    if (!this.filtrosForm.get(`${control}`)?.value) {
      this.filtrosForm.get(`${control}`)?.setValidators([
      ]);
    } else {
      this.filtrosForm.get(`${control}`)?.setValidators([
      ]);
    }
    this.filtrosForm.get(`${control}`)?.updateValueAndValidity();
  }

  showErrors(control: string): boolean {
    return (
      (this.filtrosForm.controls[control].dirty || this.filtrosForm.controls[control].touched) &&
      !isEmpty(this.filtrosForm.controls[control].errors)
    );
  }

 

   getByRolUser() {
    this.spinner = true;
    const $rol = this.limitService
                  .getByIdRol(this.nombreUsuario)
                  .pipe(finalize( () => this.getListData(this.filtrosData)))
                  .subscribe(
                    (response: any) => {
                      this.isAprobad = Boolean(response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_APROBADOR'));
                      this.spinner = false;
                    }
                  )
    this.arrayToDestroy.push($rol);
  }

  listarOrigenes(){
    /*
    this.origenOptions = (this.asientos || []).map((item) => ({
      label: item?.origen,
      value: item?.origen,
    }))
    this.origenOptions = this.eliminarObjetosDuplicados(this.origenOptions, 'label');
    this.origenOptions.unshift({label: 'Todos', value: ''});
    return this.origenOptions;*/
  }
  setData(): void {
    /*
    this.listFilter = this.isAprobad ? this.listFilter.filter(o => o.estado === 'Pendiente') : this.listFilter.filter(o => o.usuario === this.nombreUsuario);
    this.origenOptions = (this.listFilter || []).map((item) => ({
      label: item?.origen,
      value: item?.origen,
    }))
    this.origenOptions = this.eliminarObjetosDuplicados(this.origenOptions, 'label');
    this.origenOptions.unshift({label: 'Todos', value: ''});
    this.usuarioOptions = (this.listFilter || []).map((item) => ({
      label: item?.usuario,
      value: item?.usuario,
    }))
    this.usuarioOptions = this.eliminarObjetosDuplicados(this.usuarioOptions, 'label');
    this.usuarioOptions.unshift({label: 'Todos', value: ''});
    this.cuentaOptions = (this.listFilter || []).map((item) => ({
      label: item?.cuentas,
      value: item?.cuentas,
    }))
    this.cuentaOptions = this.eliminarObjetosDuplicados(this.cuentaOptions, 'label');
    this.cuentaOptions.unshift({label: 'Todos', value: ''});
    this.estadoOptions = (this.listFilter || []).map((item) => ({
      label: item?.estado,
      value: item?.estado?.substr(0,1),
    }))
    this.estadoOptions = this.eliminarObjetosDuplicados(this.estadoOptions, 'label');
    this.estadoOptions.unshift({label: 'Todos', value: ''});
    this.spinner = false;
    */
  }

  eliminarObjetosDuplicados(arr: any, prop: any): any {
    var nuevoArray: any = [];
    var lookup:any = {};

    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }

    for (i in lookup) {
        nuevoArray.push(lookup[i]);
    }

    return nuevoArray;
  }

   getListData(filtros: FiltroAsientoLimitHeader) {
  return;
   // filtros.aprobador = Number(this.isAprobad)
   // filtros.aprobadorName = this.nombreUsuario
   filtros.usuarioSesion = this.nombreUsuario;
    this.spinner = true;
    const $subas = this.lineHeaderService
      .getLimitsHeader(filtros)
      .pipe(finalize(() =>  this.setData()))
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
          }))
          this.setData();
        }
      );
    this.arrayToDestroy.push($subas);

  }

  ChangeFormateDate(oldDate: any): string{
    if (oldDate.split('-').length === 1) {
      return oldDate.toString().split("/").reverse().join("/").replace('/','-').replace('/','-');
    }
    return oldDate;
  }
}
