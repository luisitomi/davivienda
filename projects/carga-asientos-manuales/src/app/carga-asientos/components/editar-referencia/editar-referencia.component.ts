import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { ReferenciaComplementaria } from '../../models/referencia-complementaria.model';

@Component({
  selector: 'app-editar-referencia',
  templateUrl: './editar-referencia.component.html',
  styleUrls: ['./editar-referencia.component.scss']
})
export class EditarReferenciaComponent implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  focusoutName: boolean;
  focusoutValue: boolean;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditarReferenciaComponent>,
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef,
  ) {
  }
  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      value: [null, [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }

  onFocusOutEvent(control: string) {
    this.focusoutName = this.focusoutName && !this.form.get(`${control}`)?.value ? true : control === 'name' && !this.focusoutName ? true : false;
    this.focusoutValue = this.focusoutValue && !this.form.get(`${control}`)?.value ? true : control === 'value' && !this.focusoutValue ? true : false;
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
      const valueForm = this.form.value;
      const request: ReferenciaComplementaria = {
        index: 0,
        nombre: valueForm.name,
        valor: valueForm.value,
      };
      this.dialogRef.close(request);
    }
  }
}
