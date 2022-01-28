import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';

@Component({
  selector: 'app-new-parameter',
  templateUrl: './new-parameter.component.html',
  styleUrls: ['./new-parameter.component.scss'],
})
export class NewParameterComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  spinner: boolean;
  loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewParameterComponent>,
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef,
  ) {
    super();
  }
  
  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      dni: [null, [Validators.required]],
      lengerId: [null, [Validators.required]],
      cc: [null, [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }

  onFocusOutEvent(control: string) {
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

  showErrors(control: string): boolean {
    return (
      (this.form.controls[control].dirty || this.form.controls[control].touched) &&
      !isEmpty(this.form.controls[control].errors)
    );
  }

  save(): void {
    if (this.form.valid) {
      this.spinner = true;
      const valueForm = this.form.value;
      const request = {
        LengderId: valueForm?.lengerId,
        CC: valueForm?.cc,
        Dni: valueForm?.dni,
      }
      /*const $limitSave = this.limitService
        .SaveLimit(request)
        .pipe(finalize(() => this.spinner = false))
        .subscribe(
          (response: any) => {
            if(response?.status === appConstants.responseStatus.OK) {
              this.toastr.success(response?.mensaje,'Registrado');
              this.dialogRef.close({status: true, message: response?.mensaje });
            }
          }
        )
      this.arrayToDestroy.push($limitSave);*/
    }
  }
}
