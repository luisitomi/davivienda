import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { LimitSave } from '../../models/limite.model';
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
    const getUsernameSub = this.authService.getUsername().subscribe(
      nombre => this.nombreUsuario = nombre || '',
    );
    this.arrayToDestroy.push(getUsernameSub);
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
      value: [null, [Validators.required]],
      valueFinal: [null, [Validators.required]],
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
      const request: LimitSave = {
        Descripcion: valueForm?.description,
        Usuario:  this.nombreUsuario,
        Valor: valueForm?.value,
        ValorFinal: valueForm?.valueFinal,
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
