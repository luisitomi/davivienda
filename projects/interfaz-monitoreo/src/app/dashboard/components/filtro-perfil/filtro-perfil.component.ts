import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs/operators";
import { ReprocesoService } from "../../../core/services/reproceso.service";
import { UnsubcribeOnDestroy } from "../../../shared/component/general/unsubscribe-on-destroy";
import { isEmpty } from "../../../shared/component/helpers/general.helper";
import { DropdownItem } from "../../../shared/component/ui/select/select.model";


@Component({
  selector: 'app-filtro-perfil',
  templateUrl: './filtro-perfil.component.html',
  styleUrls: ['./filtro-perfil.component.scss'],
})
export class FiltroPerfilComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  spinner: boolean;
  loading: boolean;
  visibleParam2: boolean;
  visibleParam3: boolean;
  visibleParam4: boolean;
  visibleParam5: boolean;
  lblparam1: string;
  lblparam2: string;
  lblparam3: string;
  lblparam4: string;
  lblparam5: string;
  perfilOptionsCopy = [];
  perfilOptions: Array<DropdownItem>;
  selectId = 0;

  constructor(
    private formBuilder: FormBuilder,
    private reprocesoService: ReprocesoService,
    private cdRef:ChangeDetectorRef,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.viewgetProfile();
    this.createForm();
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      perfil: [null],
      param1: [null, [Validators.required]],
      param2: [null],
      param3: [null],
      param4: [null],
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }

  showErrors(control: string): boolean {
    return (
      (this.form.controls[control].dirty || this.form.controls[control].touched) &&
      !isEmpty(this.form.controls[control].errors)
    );
  }

  onFocusOutEvent(control: string): void {
    this.form.get(`${control}`)?.clearValidators();
    if (!this.form.get(`${control}`)?.value) {
      this.form.get(`${control}`)?.setValidators([
        Validators.required,
      ]);
    } else {
      this.form.get(`${control}`)?.setValidators([
        Validators.required,
      ]);
    }
    this.form.get(`${control}`)?.updateValueAndValidity();
  }

  onFocusOutEventNorequerid(control: string): void {
    this.form.get(`${control}`)?.clearValidators();
    if (!this.form.get(`${control}`)?.value) {
      this.form.get(`${control}`)?.setValidators([
        
      ]);
    } else {
      this.form.get(`${control}`)?.setValidators([
        
      ]);
    }
    this.form.get(`${control}`)?.updateValueAndValidity();
  }

  send(): void {
    if (this.form.valid)  {
      const dataForm = this.form.value;
      let message = '{'
      const dataThis: any = this.perfilOptionsCopy.find((p:any) => p?.ID === dataForm?.perfil)
      Object.entries(JSON.parse(dataThis?.JSON)).forEach((element, index) => {
        if (index === 0) {
          message += `"${element[0]}": "${dataForm?.param1}"`
        }
        if (index === 1) {
          message += `,"${element[0]}": "${dataForm?.param2}"`
        }
        if (index === 2) {
          message += `,"${element[0]}": "${dataForm?.param3}"`
        }
        if (index === 3) {
          message += `,"${element[0]}": "${dataForm?.param3}"`
        }
      });
      message += '}'
      this.spinner = true
      const $postview = this.reprocesoService
        .execViewProfile(dataThis?.URL, JSON.parse(message))
        .pipe(finalize(() => this.spinner = false))
        .subscribe((response: any) => {
          if (response) {
            this.toastr.success('Se procesó con éxito la Solicitud','Proceso');
          }
        })
      this.arrayToDestroy.push($postview);
    } else {
      this.form.markAllAsTouched()
    }
  }

  changeOption(event: any): void {
    this.selectId = event?.value
    const dataSelect: any = this.perfilOptionsCopy.find((p: any) => p?.ID === event?.value)
    this.form.patchValue({
      param1: null,
      param2: null,
      param3: null,
      param4: null,
    })
    this.visibleParam2 = false
    this.onFocusOutEventNorequerid('param2')
    this.visibleParam3 = false
    this.onFocusOutEventNorequerid('param3')
    this.visibleParam4 = false
    this.onFocusOutEventNorequerid('param4')
    Object.entries(JSON.parse(dataSelect?.JSON)).forEach((element, index) => {
      if (index === 0) {
        this.lblparam1 = element[0]
      }
      if (index === 1) {
        this.lblparam2 = element[0]
        this.visibleParam2 = true
        this.onFocusOutEvent('param2')
      }
      if (index === 2) {
        this.lblparam3 = element[0]
        this.visibleParam3 = true
        this.onFocusOutEvent('param3')
      }
      if (index === 3) {
        this.lblparam4 = element[0]
        this.visibleParam4 = true
        this.onFocusOutEvent('param4')
      }
    });
    this.selectId = dataSelect?.ID
  }

  viewgetProfile(): void {
    this.spinner = true
    const $getview = this.reprocesoService
      .viewProfile()
      .pipe(finalize(() => this.spinner = false))
      .subscribe((response: any) => {
        Object.entries(JSON.parse(response[0]?.JSON)).forEach((element, index) => {
          if (index === 0) {
            this.lblparam1 = element[0]
          }
          if (index === 1) {
            this.lblparam2 = element[0]
            this.visibleParam2 = true
            this.onFocusOutEvent('param2')
          }
          if (index === 2) {
            this.lblparam3 = element[0]
            this.visibleParam3 = true
            this.onFocusOutEvent('param3')
          }
          if (index === 3) {
            this.lblparam4 = element[0]
            this.visibleParam4 = true
            this.onFocusOutEvent('param4')
          }
        });
        this.selectId = response[0]?.ID
        this.perfilOptionsCopy = response;
        this.perfilOptions = (response || []).map((item: any) => ({
          label: item?.NOMBRE?.toUpperCase(),
          value: item?.ID,
        }))
      })
    this.arrayToDestroy.push($getview);
  }
}