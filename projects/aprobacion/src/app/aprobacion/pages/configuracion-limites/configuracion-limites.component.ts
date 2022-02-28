import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { Limit, Limite } from '../../models/limite.model';
import { LimitService } from '../../services/limit.service';

@Component({
  selector: 'app-configuracion-limites',
  templateUrl: './configuracion-limites.component.html',
  styleUrls: ['./configuracion-limites.component.scss']
})
export class ConfiguracionLimitesComponent extends UnsubcribeOnDestroy implements OnInit {
  limits: Array<Limite> = [];
  limitsCopy: Array<Limite> = [];
  selectLimits: Array<DropdownItem> = [];
  spinner = false;
  form: FormGroup;
  
  constructor(
    private limitService: LimitService,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.getListLimits();
  }

  updateLis(value: boolean): void {
    if (value) this.getListLimits();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      text: ['', []],
    });
  }

  getListLimits(): void {
    this.spinner = true;
    const $limits = this.limitService
      .getLimits()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: Limit[]) => {
          this.limits = (response || []).map((data,index) => ({
            nuevoValor: data?.Value,
            nuevoValorNew: data?.Value,
            codigo: `${data?.Description}`,
            codigoNew: `${data?.Description}`,
            importeMaximo: data?.ValueFinish,
            importeMaximoNew: data?.ValueFinish,
            estado: data?.Estado,
            id: data?.Id,
          }))
          this.limitsCopy = this.limits;
          this.selectLimits = (response || []).map((data) => ({
            label: data?.Description,
            value: data?.Description,
          }))
          this.selectLimits = this.eliminarObjetosDuplicados(this.selectLimits, 'label');
          this.selectLimits.unshift({label: 'Todos', value: ''})
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
    this.limitsCopy = this.limits.filter(p => p.codigo === data?.text).length ? this.limits.filter(p => p.codigo === data?.text) : this.limits;
  }
}
