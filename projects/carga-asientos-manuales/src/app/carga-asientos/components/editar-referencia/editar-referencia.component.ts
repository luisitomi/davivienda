import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { ReferenceComplementaryRequest, ReferenciaComplementaria } from '../../models/referencia-complementaria.model';
import { TypeReference } from '../../models/type-reference.model';
import { HeaderLineService } from '../../services/header-line.service';

@Component({
  selector: 'app-editar-referencia',
  templateUrl: './editar-referencia.component.html',
  styleUrls: ['./editar-referencia.component.scss'],
  providers: [DatePipe],
})
export class EditarReferenciaComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  focusoutValue: boolean;
  loading: boolean;
  spinner: boolean;
  typeReference: Array<DropdownItem> = [];
  selectType: string;
  isNumber: boolean;
  isDate: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditarReferenciaComponent>,
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef,
    private headerLineService: HeaderLineService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private toastr: ToastrService,
  ) {
    super();
    dialogRef.disableClose = true
  }
  
  ngOnInit(): void {
    this.createForm();
   
    this.getListReference();
   
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  getListReference(): void {
    this.spinner = true;
    const request: ReferenceComplementaryRequest = {
      origen: this.data?.name,
      tipoColumna: '2',
    }
    const $line = this.headerLineService
      .getListReference(request)
      .pipe(finalize(() => this.spinner= false))
      .subscribe(
        (response: Array<TypeReference>) => {
          const $typeReference = this.typeReference = (response || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
            type: data?.tipo,
          }));
        
          const dataValue = this.typeReference.find((p: any) => p.label === this.data?.data?.nombre);
          this.selectType = dataValue?.value || '';
        
          this.isNumber = dataValue?.type === appConstants.typeDate.NUMERICO;
          this.isDate = dataValue?.type === appConstants.typeDate.FECHA;

          this.arrayToDestroy.push($typeReference);

          if (this.data?.type === appConstants.typeEvent.EDIT) {
            this.updateForm();
          }
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
    var referencia = this.typeReference.find((p: any) => p.value === this.data?.data?.nombreValue ) ;
    const dateFormat = this.data?.data?.valor.split('/') || '';
    const dateValue = new Date(`${dateFormat[2]}/${dateFormat[1]}/${dateFormat[0]}`);
    var valor ;
    if (referencia?.type == 'Numerico') {
      valor= this.data?.data?.valor;
    } else if (referencia?.type == 'Texto') {
      valor= this.data?.data?.valor;
    } else{
      valor = dateValue;
    }

    this.form.patchValue({
      name: this.data?.data?.nombreValue,
      value: valor,
      // value: !isNaN(dateValue.getTime()) ? dateValue : this.data?.data?.valor,
    });
  }

  changeOption(event: DropdownItem): void {
  
    
    this.isNumber = event?.type === appConstants.typeDate.NUMERICO;
    this.isDate = event?.type === appConstants.typeDate.FECHA;
  }

  onFocusOutEvent(control: string) {
  
    this.focusoutValue = this.focusoutValue && !this.form.get(`${control}`)?.value ? true : control === 'value' && !this.focusoutValue ? true : false;
    this.form.get(`${control}`)?.updateValueAndValidity();
    const validNumber = this.isNumber;
    const isDate = this.isDate;

    this.form.get(`value`)?.clearValidators();

    // Valida que no sea nulo y que no sea numero
    if (!this.form.get(`${control}`)?.value && !validNumber) {
      this.form.get(`${control}`)?.clearValidators();
      this.form.get(`${control}`)?.setValidators([
        Validators.required,
        this.validate,
      ]);
    } else {
      // valida que sera numerico
      if (validNumber) {
        this.form.get(`value`)?.clearValidators();
        if(isNaN(this.form.get(`value`)?.value)) {
          this.form.get(`value`)?.setValidators([
            this.validateNumber,
          ]);
        } else {
          this.form.get(`value`)?.setValidators([
            Validators.required
          ]);
        }
        this.form.get(`value`)?.updateValueAndValidity();
      } else {
        if (isDate) {
          this.form.get(`value`)?.clearValidators();
          this.form.get(`value`)?.setValidators([
            this.validateRequirementPeriod.bind(this),
          ]);
          this.form.get(`value`)?.updateValueAndValidity();
        } 


      }      
    }
  }

  validateNumber(): ValidationErrors {  
    return { invalidNumber: true };
  }

  validateRequirementPeriod(control: any) {
    try{
      control.value = this.datePipe.transform(control?.value, appConstants.eventDate.format) || ''
    }catch{
      control.value = control?.value
    }
    const dateFormat = control?.value?.split('/');
    const dateValue = new Date(`${dateFormat[2]}/${dateFormat[1]}/${dateFormat[0]}`);
    return !isNaN(dateValue?.getTime())
      ? null
      : { isValidDate: true };
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
      if (this.typeReference.find((p: any) => p.value === valueForm.name)?.label === 'DAV_NRO_IDENTIFICACION') {
        const $validate360 = this.headerLineService.validateCliente360(valueForm.value).subscribe(
          (resposne: any) => {
            if (!resposne?.codigo) {
              this.toastr.warning(resposne?.mensaje, 'Advertencia');
            }
          }
        )
        this.arrayToDestroy.push($validate360 );
      }
      const request: ReferenciaComplementaria = {
        index: 0,
        nombre: this.typeReference.find((p: any) => p.value === valueForm.name)?.label || this.typeReference.find((p: any) => p.label === valueForm.name)?.label || '',
        nombreValue: valueForm.name,
        valor: valueForm.value,
      };
      this.dialogRef.close(request);
    }
  }
}