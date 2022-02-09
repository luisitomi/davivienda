import { OnInit, EventEmitter, Output, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { LineaAsientoInsert } from '../../../shared/models/linea-asiento-insert.model';
import { CombinacionContableService } from '../../services/combinacion-contable.service';

@Component({
  selector: 'app-editar-linea',
  templateUrl: './editar-linea.component.html',
  styleUrls: ['./editar-linea.component.scss'],
})
export class EditarLineaComponent extends UnsubcribeOnDestroy implements OnInit, AfterViewChecked{
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  currencys: Array<DropdownItem>;
  types: Array<DropdownItem>;
  inputName: string;
  focusoutCurrency: boolean;
  focusoutType: boolean;
  loading = false;
  selectType: string;
  spinner: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditarLineaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef,
    private combinacionContableService: CombinacionContableService,
  ) {
    super();
  }

  ngOnInit(){
    this.getCurrencys();
    this.createForm();
    if (this.data?.type === appConstants.typeEvent.EDIT) {
      this.updateForm();
    }
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      currency: [null, [Validators.required]],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }

  updateForm(): void {
    this.form.patchValue({
      currency: this.data?.data?.SegCurrency,
      type: this.data?.data?.EnteredDebit ? appConstants.typeCredit.DEBITO : appConstants.typeCredit.CREDITO,
      amount: this.data?.data?.EnteredDebit ? this.data?.data?.EnteredDebit : this.data?.data?.EnteredCredit,
    });
    this.selectType = this.data?.data?.EnteredDebit ? appConstants.typeCredit.DEBITO : appConstants.typeCredit.CREDITO;
  }

  showErrors(control: string): boolean {
    return (
      (this.form.controls[control].dirty || this.form.controls[control].touched) &&
      !isEmpty(this.form.controls[control].errors)
    );
  }

  onFocusOutEvent(control: string) {
    this.focusoutCurrency = this.focusoutCurrency && !this.form.get(`${control}`)?.value ? true : control === 'currency' && !this.focusoutCurrency ? true : false;
    this.focusoutType = this.focusoutType && !this.form.get(`${control}`)?.value ? true : control === 'type' && !this.focusoutCurrency ? true : false;
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

  validate(): ValidationErrors {  
    return { required: true };
  }

  getCurrencys(): void {
    this.spinner = true;
    const $currency = this.combinacionContableService
      .getListCurrency()
      .pipe(finalize(() => this.getTypes()))
      .subscribe(
        (respon: any) => {
          this.currencys = (respon || []).map((item: any) => ({
            label: item?.label,
            value: item?.value,
          }))
        }
      );
    this.arrayToDestroy.push($currency);
  }

  getTypes(): void {
    this.spinner = true;
    this.types = (DATA_TYPE || []).map((data) => ({
      label: data,
      value: data,
    }));
    this.inputName = this.types[0].value || '';
    this.spinner = false;
  }

  changeSelection(event: any): void {
    this.inputName = event?.value;
  }

  save(): void {
    if (this.form.valid) {
      const valueForm = this.form.value;
      const request: LineaAsientoInsert = {
        Id: 0,
        nroLinea: 0,
        combinationAccount: undefined,
        SegCurrency: valueForm.currency,
        EnteredDebit: valueForm.type === appConstants.typeCredit.DEBITO ? valueForm.amount : '',
        EnteredCredit: valueForm.type === appConstants.typeCredit.DEBITO ? '' : valueForm.amount,
        Description: '',
        Usuario: '',
        columnasReferenciales: [],
      }
      this.dialogRef.close(request);
    }
  }
}

const DATA_CURRENCY = ['COP', 'USD'];
const DATA_TYPE = ['Débito', 'Crédito'];
