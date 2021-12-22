import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrigenService } from '../../../core/services/origen.service';
import { HeadboardSeat, Origen } from '../../../shared';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { PeriodoContableService } from '../../services/periodo-contable.service';

@Component({
  selector: 'app-formulario-cabecera',
  templateUrl: './formulario-cabecera.component.html',
  styleUrls: ['./formulario-cabecera.component.scss']
})
export class FormularioCabeceraComponent extends UnsubcribeOnDestroy implements OnInit, OnDestroy {
  @Input() disabledForm: boolean;
  @Output() processValidate = new EventEmitter<boolean>();
  @Output() dataValidate = new EventEmitter<HeadboardSeat>();
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
    private origenService: OrigenService,
    private periodoContableService: PeriodoContableService,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.getOrigen();
    this.getPeriod();
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
    this.processValidate.emit(this.form.valid);
    this.dataValidate.emit(this.form.value);
  }

  validate() {  
    return { required: true };
  }
}
