import { OnInit, EventEmitter, Output, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';

@Component({
  selector: 'app-editar-linea',
  templateUrl: './editar-linea.component.html',
  styleUrls: ['./editar-linea.component.scss']
})
export class EditarLineaComponent extends UnsubcribeOnDestroy implements OnInit, AfterViewChecked{
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  currencys: Array<DropdownItem>;
  types: Array<DropdownItem>;
  inputName: string;
  focusoutCurrency: boolean;
  focusoutType: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditarLineaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(){
    this.getCurrencys();
    this.getTypes();
    this.createForm();
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      index: [null, [Validators.required]],
      currency: [null, [Validators.required]],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
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
    this.currencys = (DATA_CURRENCY || []).map((data) => ({
      label: data,
      value: data,
    }));
  }

  getTypes(): void {
    this.types = (DATA_TYPE || []).map((data) => ({
      label: data,
      value: data,
    }));
    this.inputName = this.types[0].value || '';
  }

  changeSelection(event: any): void {
    this.inputName = event?.value;
  }
}

const DATA_CURRENCY = ['COP', 'USD'];
const DATA_TYPE = ['Débito', 'Crédito'];
