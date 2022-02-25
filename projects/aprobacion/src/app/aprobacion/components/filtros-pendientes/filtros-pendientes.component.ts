import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { Asiento } from '../../../shared';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { FiltroAsiento } from '../../models/filtro-asiento.model';
import { LimitHeader } from '../../models/limite.model';
import { LimitService } from '../../services/limit.service';
import { LimitHeaderService } from '../../services/limitHeader.service';

@Component({
  selector: 'app-filtros-pendientes',
  templateUrl: './filtros-pendientes.component.html',
  styleUrls: ['./filtros-pendientes.component.scss'],
})
export class FiltrosPendientesComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;
  listFilter: Asiento[];
  @Output() filtros = new EventEmitter<FiltroAsiento>();
  filtrosForm: FormGroup;
  origenOptions: Array<DropdownItem>;
  usuarioOptions: Array<DropdownItem>;
  cuentaOptions: Array<DropdownItem>;
  estadoOptions: Array<DropdownItem>;
  spinner: boolean;
  filtrosData: FiltroAsiento = {
    inicio: '',
    fin: '',
    origen: '',
    usuario: '',
    estado: '',
    cuenta: '',
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
    const getUsernameSub = this.authService.getUsuarioV2().subscribe(
      nombre => this.nombreUsuario = nombre || '',
    );
    this.arrayToDestroy.push(getUsernameSub);
  }

  ngOnInit(): void {
    this.createForm();
    this.getByRolUser();
  }

  createForm(): void {
    this.filtrosForm = this.formBuilder.group({
      inicio: [null, []],
      fin: [null, []],
      usuario: [null, []],
      origen: [null, []],
      cuenta: [null, []],
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

  getByRolUser(): void {
    this.spinner = true;
    const $rol = this.limitService
                  .getByIdRol(this.nombreUsuario)
                  .pipe(finalize(() => this.getListData(this.filtrosData)))
                  .subscribe(
                    (response: any) => {
                      this.isAprobad = response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_APROBADOR');
                    }
                  )
    this.arrayToDestroy.push($rol);
  }

  setData(): void {
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

  getListData(filtros: FiltroAsiento): void {
    this.spinner = true;
    const $subas = this.lineHeaderService
      .getLimitsHeader(filtros)
      .pipe(finalize(() => this.setData()))
      .subscribe(
        (asiento: LimitHeader[]) => {
          this.listFilter = (asiento || []).map((item) => ({
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
          }))
        }
      );
    this.arrayToDestroy.push($subas);
  }
}
