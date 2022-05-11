import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { Limit } from '../../models/limite.model';
import { LimitService } from '../../services/limit.service';

@Component({
  selector: 'app-configuracion-limites',
  templateUrl: './configuracion-limites.component.html',
  styleUrls: ['./configuracion-limites.component.scss']
})
export class ConfiguracionLimitesComponent extends UnsubcribeOnDestroy implements OnInit {
  limits:any = [];
  limitsCopy:any = [];
  selectLimits: Array<DropdownItem> = [];
  spinner = false;
  form: FormGroup;
  activeSelect: any = [{value: '', label: 'Todos'},{value: 0, label: 'Activo'},{value: 1, label: 'Desactivo'}];
  
  constructor(
    private limitService: LimitService,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.getListLimits();
    this.getListLimitsFilter();
  }

  updateLis(value: boolean): void {
    if (value) {
      this.getListLimits();
    }
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      text: ['', []],
      estado: ['', []],
      count: ['', []],
      import: ['', []],
    });
  }

  getListLimitsFilter(): void {
    this.spinner = true;
    const $limits = this.limitService
      .getFilter()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any[]) => {
          this.selectLimits = (response || []).map((data) => ({
            label: data?.Nombre,
            value: data?.Nombre,
          }))
          this.selectLimits.unshift({label: 'Todos', value: ''})
        }
      );
    this.arrayToDestroy.push($limits);
  }

  getListLimits(): void {
    this.spinner = true;
    const $limits = this.limitService
      .getLimits()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: Limit[]) => {
          this.limits = (response || []).map((data) => ({
            nuevoValor: data?.Value,
            nuevoValorNew: data?.Value,
            codigo: `${data?.Description}`,
            codigoNew: `${data?.Description}`,
            importeMaximo: data?.ValueFinish?.toFixed(2),
            importeMaximoNew: data?.ValueFinish?.toFixed(2),
            estado: data?.Estado,
            id: data?.Id,
          }))
          this.limits.sort(function (a: any, b: any) {   
            return a.codigo - b.codigo || a.nuevoValor - b.nuevoValor;
          });
          this.limitsCopy = this.limits;
        }
      );
    this.arrayToDestroy.push($limits);
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

  buscar(): void {
    const data = this.form.value;
    this.limitsCopy = this.limits.filter((p: any) => 
                        p.codigo?.toString()?.includes(data?.text || '') &&
                        p.estado?.toString()?.includes(data?.estado?.toString() || '') &&
                        p.nuevoValor?.toString()?.includes(data?.count || '') &&
                        p.importeMaximo?.toString()?.includes(data?.import?.replace(/,/g, "") || '')
                      )
  }
}
