import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';

@Component({
  selector: 'app-registro-reporte',
  templateUrl: './registro-reporte.component.html',
  styleUrls: ['./registro-reporte.component.scss'],
})
export class RegistroReporteComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  filtrosForm: FormGroup;
  spinner: boolean;
  listType = [];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.filtrosForm = this.formBuilder.group({
      type: [null, [Validators.required]],
      items: this.formBuilder.array([this.formBuilder.group({
        name: [null, [Validators.required]],
        value: [null, [Validators.required]],
        type: [null, [Validators.required]],
      })])
    });
    this.filtrosForm.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.filtrosForm.invalid);
    });
  }

  createItem() {
    this.items.push(this.formBuilder.group({
      name: [null, [Validators.required]],
      value: [null, [Validators.required]],
      type: [null, [Validators.required]],
    }));
  }

  delInput(id: number): void {
    this.items.removeAt(id);
  }

  get items() {
    return this.filtrosForm.get("items") as FormArray;
  }

  onFocusOutEvent(control: string) {
    this.filtrosForm.get(`${control}`)?.clearValidators();
    if (!this.filtrosForm.get(`${control}`)?.value) {
      this.filtrosForm.get(`${control}`)?.setValidators([
      ]);
    } else {
      this.filtrosForm.get(`${control}`)?.setValidators([
      ]);
    }
    this.filtrosForm.get(`${control}`)?.updateValueAndValidity();
  }

  showErrors(control: string): boolean {
    return (
      (this.filtrosForm.controls[control].dirty || this.filtrosForm.controls[control].touched) &&
      !isEmpty(this.filtrosForm.controls[control].errors)
    );
  }
}
