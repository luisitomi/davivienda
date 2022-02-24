import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { OrigenService } from '../../../core/services/origen.service';
import { HeadboardSeat, Origen } from '../../../shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { HeaderLineService } from '../../services/header-line.service';

@Component({
  selector: 'app-formulario-cabecera',
  templateUrl: './formulario-cabecera.component.html',
  styleUrls: ['./formulario-cabecera.component.scss'],
})
export class FormularioCabeceraComponent extends UnsubcribeOnDestroy implements OnInit, AfterViewChecked {
  @Input() disabledForm: boolean;
  @Input() restForm: boolean;
  @Input() valorupdateForm: string;
  @Output() processValidate = new EventEmitter<boolean>();
  @Output() dataValidate = new EventEmitter<HeadboardSeat>();
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() proceesAutomaty = new EventEmitter<boolean>();
  @Output() proceesAutomatyResh = new EventEmitter<boolean>();
  title = "Cabecera";
  form: FormGroup;
  origens: Array<DropdownItem>;
  periods: Array<DropdownItem>;
  leaders: Array<DropdownItem>;
  focusoutOrigen = false;
  focusoutLeader = false;
  focusoutPeriod = false;
  focusoutNumber = false;
  focusoutDescription = false;
  showTable = false;
  selectOrigen = "";
  selectPeriod = "";
  selectLeaders = "";
  spinner: boolean;
  disabledFecha = true;
  periodData: any[];
  fechaIsValid: boolean;
  disbaledPeriod = true;

  constructor(
    private origenService: OrigenService,
    private periodoContableService: HeaderLineService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cdRef:ChangeDetectorRef,
  ) {
    super();
  }

  ngAfterViewChecked(){
    if (this.restForm) {
      this.proceesAutomaty.emit(true);
      this.form.patchValue({
        number: this.valorupdateForm,
      });
    }
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.createForm();
    this.getOrigen();
    this.updateForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      origen: [null, [Validators.required]],
      leader: [null, [Validators.required]],
      period: [null],
      number: [''],
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
        leader: model?.header?.LegderName,
        period: model?.header?.Period,
        number: model?.header?.TrxNumber,
        description: model?.header?.Description,
        accountingDate: new Date(`${dateFormat[2]}/${dateFormat[1]}/${dateFormat[0]}`),
      });
      this.selectOrigen = model?.header?.SourceName;
      this.selectLeaders = model?.header?.LegderName;
      this.getPeriod(Number(model?.header?.LegderName));
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
      .pipe(finalize(() => this.getLeader()))
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

  getPeriod(id: number): void {
    this.spinner = true;
    this.disabledFecha = true;
    this.periods = [];
    const $period = this.periodoContableService
      .getListPeriod(id)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any[]) => {
          this.periodData = response;
          this.periods = (response || []).map((data) => ({
            label: data?.period_name,
            value: data?.period_name,
          }),
        );
        if (this.periods?.length) this.disabledFecha = false;
        const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
        if (model?.header) {
          this.selectPeriod = model?.header?.Period;
          this.disabledFecha = true;
        }
      });
    this.arrayToDestroy.push($period);
  }

  getLeader(): void {
    const $leader = this.periodoContableService
      .getListLeader()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any[]) => {
          this.leaders = (response || []).map((data) => ({
            label: data?.BU_NAME,
            value: data?.BU_NAME,
          }),
        )}
      );
    this.arrayToDestroy.push($leader);
  }

  changeOption(event: any){
    this.form.patchValue({
      origen: event?.value,
    });
  }

  changeOptionL(event: any){
    this.form.patchValue({
      accountingDate: null,
    });
    this.form.patchValue({
      leader: event?.value,
    });
    this.getPeriod(event?.value);
  }

  changeOptionP(event: any){
    this.form.patchValue({
      period: event?.value,
    });
  }

  onFocusOutEvent(control: string): void {
    this.focusoutOrigen = this.focusoutOrigen && !this.form.get(`${control}`)?.value ? true : control === 'origen' && !this.focusoutOrigen ? true : false;
    this.focusoutLeader = this.focusoutLeader && !this.form.get(`${control}`)?.value ? true : control === 'leader' && !this.focusoutLeader ? true : false;
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
    this.processValidate.emit(this.form.valid && this.fechaIsValid);
    this.dataValidate.emit(this.form.value);
  }

  onSelectCalendarMont(event: any): void {
    const valueFecha = this.periodData.find(p => Number(p?.period_num) === Number(event?.value?.getMonth() < 12 ?
    event?.value?.getMonth()+1 < 10 ? 
      event?.value?.getFullYear()+'0'+(event?.value?.getMonth()+1) :
      event?.value?.getFullYear()+event?.value?.getMonth()+1 
    : 1))?.closing_status === 'O';
    if (!valueFecha) {
      this.toastr.warning('Periodo no esta activo', 'Advertencia');
      this.fechaIsValid = false;
      return;
    } else {
      this.fechaIsValid = true;
      this.form.patchValue({
        period: this.periodData.find(p => Number(p?.period_num) === Number(event?.value?.getMonth() < 12 ?
        event?.value?.getMonth()+1 < 10 ? 
          event?.value?.getFullYear()+'0'+(event?.value?.getMonth()+1) :
          event?.value?.getFullYear()+''+(event?.value?.getMonth()+1) 
        : 1))?.period_name,
      });
      this.selectPeriod = this.periodData.find(p => Number(p?.period_num) === Number(event?.value?.getMonth() < 12 ?
      event?.value?.getMonth()+1 < 10 ? 
        event?.value?.getFullYear()+'0'+(event?.value?.getMonth()+1) :
        event?.value?.getFullYear()+''+(event?.value?.getMonth()+1) 
      : 1))?.period_name;
      this.processValidate.emit(this.form.valid);
      this.dataValidate.emit(this.form.value);
    }
  }

  removeChanges(): void {
    localStorage.removeItem(appConstants.modelSave.NEWSEAT);
    this.form.patchValue({
      period: null,
      number: null,
      description: null,
      accountingDate: null,
    });
    this.selectPeriod = '';
    const value = this.form.value;
    this.getPeriod(value?.leader);
    this.processValidate.emit(this.form.valid);
    this.dataValidate.emit(this.form.value);
    this.proceesAutomaty.emit(this.form.valid);
    this.proceesAutomatyResh.emit(true);
  }
}
