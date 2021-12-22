import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrigenService } from '../../../core/services/origen.service';
import { CabeceraAsiento, Origen } from '../../../shared';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { AsientoManualService } from '../../services/asiento-manual.service';
import { PeriodoContableService } from '../../services/periodo-contable.service';

@Component({
  selector: 'app-formulario-cabecera',
  templateUrl: './formulario-cabecera.component.html',
  styleUrls: ['./formulario-cabecera.component.scss']
})
export class FormularioCabeceraComponent extends UnsubcribeOnDestroy implements OnInit, OnDestroy {
  @Output() saveCabeceraAsiento = new EventEmitter<CabeceraAsiento>();
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  title = "Cabecera";
  form: FormGroup;
  origens: Array<DropdownItem>;
  periods: Array<DropdownItem>;
  focusoutOrigen = false;
  focusoutPeriod = false;
  focusoutNumber = false;
  focusoutDescription = false;
  showTable = false;

  constructor(
    private asientoManualService: AsientoManualService,
    private origenService: OrigenService,
    private periodoContableService: PeriodoContableService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.getOrigen();
    this.getPeriod();
  }

  save(): void {
    this.asientoManualService.grabarAsiento().subscribe(
      res => {
        this.snackBar.open('Asiento registrado');
        this.asientoManualService.clear();
        this.router.navigate(['/dashboard/infolet']);
      },
    );
  }

  saveCabecera(): void {
    this.saveCabeceraAsiento.emit(this.form.value);
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      origen: [null, [Validators.required]],
      period: [null, [Validators.required]],
      number: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }

  showErrors(control: string): boolean {
    return (
      (this.form.controls[control].dirty || this.form.controls[control].touched) &&
      !isEmpty(this.form.controls[control].errors)
    );
  }

  getOrigen(): void {
    const $origen = this.origenService.getOrigenes().subscribe(
      (response: Origen[]) => {
        this.origens = (response || []).map((data) => ({
          label: data?.ORIGEN,
          value: data?.ORIGEN,
        }),
      )}
    );
    this.arrayToDestroy.push($origen);
  }

  getPeriod(): void {
    const $period = this.periodoContableService.getPeriodos().subscribe(
      (response: string[]) => {
        this.periods = (response || []).map((data) => ({
          label: data,
          value: data,
        }),
      )}
    );
    this.arrayToDestroy.push($period);
  }

  onFocusOutEvent(control: string) {
    this.focusoutOrigen = this.focusoutOrigen && !this.form.get(`${control}`)?.value ? true : control === 'origen' && !this.focusoutOrigen ? true : false;
    this.focusoutPeriod = this.focusoutPeriod && !this.form.get(`${control}`)?.value ? true : control === 'period' && !this.focusoutPeriod ? true : false;
    this.focusoutNumber = this.focusoutNumber && !this.form.get(`${control}`)?.value ? true : control === 'number' && !this.focusoutNumber ? true : false;
    this.focusoutDescription = this.focusoutDescription && !this.form.get(`${control}`)?.value ? true : control === 'description' && !this.focusoutDescription ? true : false;
    this.form.get(`${control}`)?.clearValidators();
    if (!this.form.get(`${control}`)?.value) {
      this.form.get(`${control}`)?.setValidators([
        Validators.required,
        this.validate,
      ]);
    } else {
      this.form.get(`${control}`)?.setValidators([
        Validators.required,
      ]);
    }
    this.form.get(`${control}`)?.updateValueAndValidity();
  }

  validate() {  
    return { required: true };
  }
}
