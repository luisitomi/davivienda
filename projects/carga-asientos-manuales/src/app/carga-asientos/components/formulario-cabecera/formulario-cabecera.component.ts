import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { OrigenService } from '../../../core/services/origen.service';
import { HeadboardSeat, Origen } from '../../../shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { PeriodoContableService } from '../../services/periodo-contable.service';

@Component({
  selector: 'app-formulario-cabecera',
  templateUrl: './formulario-cabecera.component.html',
  styleUrls: ['./formulario-cabecera.component.scss'],
})
export class FormularioCabeceraComponent extends UnsubcribeOnDestroy implements OnInit, OnDestroy {
  @Input() disabledForm: boolean;
  @Output() processValidate = new EventEmitter<boolean>();
  @Output() dataValidate = new EventEmitter<HeadboardSeat>();
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() proceesAutomaty = new EventEmitter<boolean>();
  title = "Cabecera";
  form: FormGroup;
  origens: Array<DropdownItem>;
  periods: Array<DropdownItem>;
  focusoutOrigen = false;
  focusoutPeriod = false;
  focusoutNumber = false;
  focusoutDescription = false;
  showTable = false;
  selectOrigen = "";
  selectPeriod = "";
  spinner: boolean;

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
    this.updateForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      origen: [null, [Validators.required]],
      period: [null, [Validators.required]],
      number: [null, [Validators.required]],
      description: [null, [Validators.required]],
      accountingDate: [null, [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }

  updateForm(): void {
    const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
    const dateFormat = model?.header?.AccountingDate.split('/') || '';
    if (model?.header) {
      this.form.patchValue({
        origen: model?.header?.SourceName,
        period: model?.header?.Period,
        number: model?.header?.TrxNumber,
        description: model?.header?.Description,
        accountingDate: new Date(`${dateFormat[2]}/${dateFormat[1]}/${dateFormat[0]}`),
      });
      this.selectOrigen = model?.header?.SourceName;
      this.selectPeriod = model?.header?.Period;
    }
    this.processValidate.emit(this.form.valid);
    this.dataValidate.emit(this.form.value);
    this.proceesAutomaty.emit(this.form.valid);
  }

  showErrors(control: string): boolean {
    return (
      (this.form.controls[control].dirty || this.form.controls[control].touched) &&
      !isEmpty(this.form.controls[control].errors)
    );
  }

  getOrigen(): void {
    this.spinner = true;
    const $origen = this.origenService
      .getOrigenes()
      .pipe(finalize(() => this.getPeriod()))
      .subscribe(
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
    const $period = this.periodoContableService
      .getPeriodos()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: string[]) => {
          this.periods = (response || []).map((data) => ({
            label: data,
            value: data,
          }),
        )}
      );
    this.arrayToDestroy.push($period);
  }

  changeOption(event: any){
    this.form.patchValue({
      origen: event?.value,
    });
  }

  changeOptionP(event: any){
    this.form.patchValue({
      period: event?.value,
    });
  }

  onFocusOutEvent(control: string): void {
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

  validate(): ValidationErrors {  
    return { required: true };
  }

  onSelectedCalendar(): void {
    this.processValidate.emit(this.form.valid);
    this.dataValidate.emit(this.form.value);
  }
}
