import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { Limit, LimitSave } from '../../models/limite.model';
import { LimitService } from '../../services/limit.service';

@Component({
  selector: 'app-new-limit',
  templateUrl: './new-limit.component.html',
  styleUrls: ['./new-limit.component.scss'],
})
export class NewLimitComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  spinner: boolean;
  loading: boolean;
  nombreUsuario: string;
  selectTypeUser = DATA_TYPE;
  selectTypeNivel: Array<DropdownItem> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewLimitComponent>,
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef,
    private toastr: ToastrService,
    private limitService: LimitService,
    private authService: AuthService,
  ) {
    super();
    this.authService.getUsuarioV2().subscribe(rpta => this.nombreUsuario = rpta || '');
  }
  
  ngOnInit(): void {
    this.createForm();
    this.getListLimits();
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      description: [null, [Validators.required]],
      value: [null, [Validators.required]],
      valueFinal: [null, [Validators.required]],
      typeUser: [null],
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

  getListLimits(): void {
    this.spinner = true;
    const $limits = this.limitService
      .getLimits()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: Limit[]) => {
          response = response.filter(p => p.Description !== 'Automatico');
          this.selectTypeNivel = (response || []).map((data) => ({
            label: data?.Description?.toUpperCase(),
            value: data?.Description,
          }))
          this.selectTypeNivel = this.eliminarObjetosDuplicados(this.selectTypeNivel, 'label');
          this.selectTypeNivel.unshift({label: 'Todos', value: ''})
        }
      );
    this.arrayToDestroy.push($limits);
  }

  eliminarObjetosDuplicados(arr: any, prop: any): any {
    var nuevoArray: any = [];
    var lookup:any = {};

    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }

    for (i in lookup) {
        nuevoArray.push(lookup[i]);
    }

    return nuevoArray;
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
      const request: LimitSave = {
        Descripcion: valueForm?.description,
        Usuario:  this.nombreUsuario,
        Valor: valueForm?.value,
        ValorFinal: valueForm?.valueFinal,
        Type: valueForm?.typeUser,
      }
      const $limitSave =this.limitService
        .SaveLimit(request)
        .pipe(finalize(() => this.spinner = false))
        .subscribe(
          (response: any) => {
            if(response?.status === appConstants.responseStatus.OK) {
              this.toastr.success(response?.mensaje,'Registrado');
              this.dialogRef.close(request);
            }
          }
        )
      this.arrayToDestroy.push($limitSave);
    }
  }
}

const DATA_TYPE = [
  {
    label:'Automático',
    value:'-',
  },
  {
    label:'Aprobador',
    value:'DAV_FAH_ROL_DE_APROBADOR',
  },
  {
    label:'Preparador',
    value:'DAV_FAH_ROL_DE_PREPARADOR',
  },
];