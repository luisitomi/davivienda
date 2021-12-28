import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { CombinacionContable } from '../../models/combinacion-contable.model';
import { Maestra } from '../../models/maestra.model';
import { CombinacionContableService } from '../../services/combinacion-contable.service';

@Component({
  selector: 'app-combinacion-contable',
  templateUrl: './combinacion-contable.component.html',
  styleUrls: ['./combinacion-contable.component.scss']
})
export class CombinacionContableComponent extends UnsubcribeOnDestroy implements OnInit, AfterViewChecked {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  parte1Options: Array<DropdownItem> = [];
  parte2Options: Array<DropdownItem> = [];
  parte3Options: Array<DropdownItem> = [];
  parte4Options: Array<DropdownItem> = [];
  parte5Options: Array<DropdownItem> = [];
  parte6Options: Array<DropdownItem> = [];
  parte7Options: Array<DropdownItem> = [];
  parte8Options: Array<DropdownItem> = [];
  parte9Options: Array<DropdownItem> = [];
  parte10Options: Array<DropdownItem> = [];
  parte11Options: Array<DropdownItem> = [];
  loading = false;
  comp2Select: string;
  comp3Select: string;
  comp4Select: string;
  comp5Select: string;
  comp6Select: string;
  comp7Select: string;
  comp8Select: string;
  comp9Select: string;
  comp10Select: string;
  comp11Select: string;

  constructor(
    public dialogRef: MatDialogRef<CombinacionContableComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private combinacionContableService: CombinacionContableService,
  ) {
    super();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      comp1: [1, [Validators.required]],
      comp2: [null, [Validators.required]],
      comp3: [null, [Validators.required]],
      comp4: [null, [Validators.required]],
      comp5: [null, [Validators.required]],
      comp6: [null, [Validators.required]],
      comp7: [null, [Validators.required]],
      comp8: [null, [Validators.required]],
      comp9: [null, [Validators.required]],
      comp10: [null, [Validators.required]],
      comp11: [null, [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
  
  ngOnInit(): void {
    this.getOptions2();
    this.createForm();
  }

  updateForm(): void {
    this.form.patchValue({
      comp2: this.data?.data?.comp2,
      comp3: this.data?.data?.comp3,
      comp4: this.data?.data?.comp4,
      comp5: this.data?.data?.comp5,
      comp6: this.data?.data?.comp6,
      comp7: this.data?.data?.comp7,
      comp8: this.data?.data?.comp8,
      comp9: this.data?.data?.comp9,
      comp10: this.data?.data?.comp10,
      comp11: this.data?.data?.comp11,
    });
    this.comp2Select = this.data?.data?.comp2;
    this.comp3Select = this.data?.data?.comp3;
    this.comp4Select = this.data?.data?.comp4;
    this.comp5Select = this.data?.data?.comp5;
    this.comp6Select = this.data?.data?.comp6;
    this.comp7Select = this.data?.data?.comp7;
    this.comp8Select = this.data?.data?.comp8;
    this.comp9Select = this.data?.data?.comp9;
    this.comp10Select = this.data?.data?.comp10;
    this.comp11Select = this.data?.data?.comp11;
  }

  showErrors(control: string): boolean {
    return (
      (this.form.controls[control].dirty || this.form.controls[control].touched) &&
      !isEmpty(this.form.controls[control].errors)
    );
  }

  validate(): ValidationErrors {  
    return { required: true };
  }

  getOptions2(): void {
    const $option2 = this.combinacionContableService
      .getParte2()
      .pipe(finalize(() => this.getOptions3()))
      .subscribe(
        (parte2: Maestra[]) => {
          this.parte2Options = (parte2 || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option2);
  }

  getOptions3(): void {
    const $option3 = this.combinacionContableService
      .getParte3()
      .pipe(finalize(() => this.getOptions4()))
      .subscribe(
        (parte3: Maestra[]) => {
          this.parte3Options = (parte3 || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option3);
  }

  getOptions4(): void {
    const $option4 = this.combinacionContableService
      .getParte4()
      .pipe(finalize(() => this.getOptions5()))
      .subscribe(
        (parte4: Maestra[]) => {
          this.parte4Options = (parte4 || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option4);
  }

  getOptions5(): void {
    const $option5 = this.combinacionContableService
      .getParte5()
      .pipe(finalize(() => this.getOptions6()))
      .subscribe(
        (parte5: Maestra[]) => {
          this.parte5Options = (parte5 || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option5);
  }

  getOptions6(): void {
    const $option6 = this.combinacionContableService
      .getParte6()
      .pipe(finalize(() => this.getOptions7()))
      .subscribe(
        (parte6: Maestra[]) => {
          this.parte6Options = (parte6 || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option6);
  }

  getOptions7(): void {
    const $option7 = this.combinacionContableService
      .getParte7()
      .pipe(finalize(() => this.getOptions8()))
      .subscribe(
        (parte7: Maestra[]) => {
          this.parte7Options = (parte7 || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option7);
  }

  getOptions8(): void {
    const $option8 = this.combinacionContableService
      .getParte8()
      .pipe(finalize(() => this.getOptions9()))
      .subscribe(
        (parte8: Maestra[]) => {
          this.parte8Options = (parte8 || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option8);
  }

  getOptions9(): void {
    const $option9 = this.combinacionContableService
      .getParte9()
      .pipe(finalize(() => this.getOptions10()))
      .subscribe(
        (parte9: Maestra[]) => {
          this.parte9Options = (parte9 || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option9);
  }

  getOptions10(): void {
    const $option10 = this.combinacionContableService
      .getParte10()
      .pipe(finalize(() => this.getOptions11()))
      .subscribe(
        (parte10: Maestra[]) => {
          this.parte10Options = (parte10 || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option10);
  }

  getOptions11(): void {
    const $option11 = this.combinacionContableService
      .getParte11()
      .pipe(finalize(() => {
          if (this.data?.type === appConstants.typeEvent.EDIT) {
            this.updateForm();
          }
      }))
      .subscribe(
        (parte11: Maestra[]) => {
          this.parte11Options = (parte11 || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option11);
  }

  onFocusOutEvent(control: string) {
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

  save(): void {
    if (this.form.valid) {
      const valueForm = this.form.value;
      const request: CombinacionContable = {
        comp1: valueForm.comp1,
        comp2: valueForm.comp2,
        comp3: valueForm.comp3,
        comp4: valueForm.comp4,
        comp5: valueForm.comp5,
        comp6: valueForm.comp6,
        comp7: valueForm.comp7,
        comp8: valueForm.comp8,
        comp9: valueForm.comp9,
        comp10: valueForm.comp10,
        comp11: valueForm.comp11,
      }
      this.dialogRef.close(request);
    }
  }
}
