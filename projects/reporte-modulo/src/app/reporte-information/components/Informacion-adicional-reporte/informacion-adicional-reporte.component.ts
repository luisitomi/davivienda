import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { ReporteParam } from '../../../shared/models/reporte-param.model';

@Component({
  selector: 'app-informacion-adicional-reporte',
  templateUrl: './informacion-adicional-reporte.component.html',
  styleUrls: ['./informacion-adicional-reporte.component.scss'],
})
export class InformacionAdicionalReporteComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  spinner: boolean;
  loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReporteParam,
    public dialogRef: MatDialogRef<InformacionAdicionalReporteComponent>,
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
/*
  createItem() {
    const number = this.items.value.filter((p: any) => p.Estado !== 2)
    this.items.push(this.formBuilder.group({
      IdParam: [0],
      NumeroParametro: [number.length + 1, [Validators.required]],
      NombreParametro: [null, [Validators.required]],
      ValorParametro: [null],
      TipoParametro: [null, [Validators.required]],
      Obligatorio: [null, [Validators.required]],
      Descripcion: [null, [Validators.required]],
      Estado: [0, [Validators.required]],
    }));
  }
  */
/*
  updateItem() {
    this.delInput(0);
    this.reporte.parametros?.forEach((currentValue: any, index: any) => {
      this.items.push(this.formBuilder.group({
        IdParam: [currentValue.IdParam],
        NumeroParametro: [currentValue.Index, [Validators.required]],
        NombreParametro: [currentValue.NombreParametro, [Validators.required]],
        ValorParametro: [currentValue.ValorParametro],
        TipoParametro: [currentValue.TipoParametro, [Validators.required]],
        Obligatorio: [currentValue.Obligatorio, [Validators.required]],
        Descripcion: [currentValue.Descripcion, [Validators.required]],
        Estado: [currentValue.Estado, [Validators.required]],
      }));
    });

  }
  */

  createForm(): void {
    this.form = this.formBuilder.group({
      IdParam: [this.data.IdParam],
      NumeroParametro: [this.data.NumeroParametro, [Validators.required]],
      NombreParametro: [this.data.NombreParametro, [Validators.required]],
      ValorParametro: [this.data.ValorParametro],
      TipoParametro: [this.data.TipoParametro, [Validators.required]],
      Obligatorio: [this.data.Obligatorio, [Validators.required]],
      Descripcion: [this.data.Descripcion, [Validators.required]],
      Estado: [this.data.Estado, [Validators.required]],
      Visible : [0, [Validators.required]],
      FormatoFecha: [null, [Validators.required]],
      ConsultaSQL:  [null, [Validators.required]],
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

      this.dialogRef.close(this.form.value);
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
