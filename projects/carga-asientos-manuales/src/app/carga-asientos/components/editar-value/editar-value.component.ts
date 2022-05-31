import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';

@Component({
  selector: 'app-editar-value',
  templateUrl: './editar-value.component.html',
  styleUrls: ['./editar-value.component.scss'],
})
export class EditarValueComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  loading: boolean;
  spinner: boolean;
  typeReference: Array<DropdownItem> = [];

  constructor(
    public dialogRef: MatDialogRef<EditarValueComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
    dialogRef.disableClose = true
  }
  
  ngOnInit(): void {
    this.createForm();
    if (this.data?.type === appConstants.typeEvent.EDIT) {
      this.updateForm();
    }
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      value: [null, [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }

  updateForm(): void {
    this.form.patchValue({
      value: this.data?.data?.valor,
    });
  }

  showErrors(control: string): boolean {
    return (
      (this.form.controls[control].dirty || this.form.controls[control].touched) &&
      !isEmpty(this.form.controls[control].errors)
    );
  }

  save(): void {
    if (this.form.valid) {
      const valueForm = this.form.value;
      const request = {
        valor: valueForm.value,
      };
      this.dialogRef.close(request);
    }
  }
}
