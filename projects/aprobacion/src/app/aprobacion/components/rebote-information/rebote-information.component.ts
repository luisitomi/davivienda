import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';

@Component({
  selector: 'app-rebote-information',
  templateUrl: './rebote-information.component.html',
  styleUrls: ['./rebote-information.component.scss'],
})
export class ReboteInformationComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  spinner: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReboteInformationComponent>,
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
      description: [null, [Validators.required]],
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

  save(): void {
    if (this.form.valid) {
      const valueForm = this.form.value;
      const request = {
        description: valueForm?.description,
      }
      this.dialogRef.close(request);
    } else {
      this.form.markAllAsTouched();
    }
  }

  showErrors(control: string): boolean {
    return (
      (this.form.controls[control].dirty || this.form.controls[control].touched) &&
      !isEmpty(this.form.controls[control].errors)
    );
  }
}