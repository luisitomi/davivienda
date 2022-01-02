import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { ReferenceComplementaryRequest, ReferenciaComplementaria } from '../../models/referencia-complementaria.model';
import { HeaderLineService } from '../../services/header-line.service';

@Component({
  selector: 'app-editar-referencia',
  templateUrl: './editar-referencia.component.html',
  styleUrls: ['./editar-referencia.component.scss']
})
export class EditarReferenciaComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  focusoutName: boolean;
  focusoutValue: boolean;
  loading: boolean;
  spinner: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditarReferenciaComponent>,
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef,
    private headerLineService: HeaderLineService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
  }
  
  ngOnInit(): void {
    this.getListReference();
    this.createForm();
    if (this.data?.type === appConstants.typeEvent.EDIT) {
      this.updateForm();
    }
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  getListReference(): void {
    this.spinner = true;
    const request: ReferenceComplementaryRequest = {
      origen: 'Line',
      tipoColumna: '2',
    }
    const $line = this.headerLineService
      .getListReference(request)
      .pipe(finalize(() => this.spinner= false))
      .subscribe(
        (response: any) => {
          console.log(response);
        }
      );
    this.arrayToDestroy.push($line);
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

  updateForm(): void {
    this.form.patchValue({
      name: this.data?.data?.nombre,
      value: this.data?.data?.valor,
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
