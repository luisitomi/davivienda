import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs/operators";
import { AuthService } from "../../../core/services/auth.service";
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
  visibleParam6: boolean;
  lblparam1: string;
  lblparam2: string;
  lblparam3: string;
  lblparam4: string;
  lblparam5: string;
  lblparam6: string;
  perfilOptionsCopy = [];
  perfilOptions: Array<DropdownItem>;
  selectId = 0;
  lbBolean1 = false;
  lbBolean2 = false;
  lbBolean3 = false;
  lbBolean4 = false;
  lbBolean5 = false;
  lbBolean6 = false;
  autorizacion: string;
  constructor(
    public dialogRef: MatDialogRef<FiltroPerfilComponent>,
    private formBuilder: FormBuilder,
    private reprocesoService: ReprocesoService,
    private cdRef:ChangeDetectorRef,
    private toastr: ToastrService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.authService.getToken().subscribe(
      (token) => {
        this.autorizacion = 'Bearer ' + token;
      }
    );
    this.createForm();
    this.viewgetProfile();

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
      param5: [null],
      param6: [null],
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
      const dataThis: any = this.perfilOptionsCopy.find((p:any) => p?.ID === dataForm?.perfil /*|| this.perfilOptionsCopy[0]*/)
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
          message += `,"${element[0]}": "${dataForm?.param4}"`
        }
        if (index === 4) {
          message += `,"${element[0]}": "${dataForm?.param5}"`
        }
        if (index === 5) {
          message += `,"${element[0]}": "${dataForm?.param6}"`
        }
       
      });

      if (this.data == null) {
        message += `,"Jwt": "${this.autorizacion}"`
      }
      message += '}'
      this.spinner = true
      const $postview = this.reprocesoService
        .execViewProfile(dataThis?.URL, JSON.parse(message))
        .pipe(finalize(() => this.spinner = false))
        .subscribe((response: any) => {
          if (response) {
            this.toastr.success('Se procesó con éxito la Solicitud','Proceso');
            this.dialogRef.close(true);
          }
        })
      this.arrayToDestroy.push($postview);
    } else {
      this.form.markAllAsTouched()
    }
  }

  changeOption(event: any): void {
    this.lbBolean1 = false;
    this.lbBolean2 = false;
    this.lbBolean3 = false;
    this.lbBolean4 = false;
    this.lbBolean5 = false;
    this.lbBolean6 = false;
    this.selectId = event?.value
    const dataSelect: any = this.perfilOptionsCopy.find((p: any) => p?.ID === event?.value)
    this.form.patchValue({
      param1: null,
      param2: null,
      param3: null,
      param4: null,
      param5: null,
      param6: null,
    })
    this.visibleParam2 = false
    this.onFocusOutEventNorequerid('param2')
    this.visibleParam3 = false
    this.onFocusOutEventNorequerid('param3')
    this.visibleParam4 = false
    this.onFocusOutEventNorequerid('param4')
    this.visibleParam5 = false
    this.onFocusOutEventNorequerid('param5')
    this.visibleParam6 = false
    this.onFocusOutEventNorequerid('param6')
    Object.entries(JSON.parse(dataSelect?.JSON)).forEach((element, index) => {
    
      if (index === 0) {
        if (element[1] == 'string'){
          this.lblparam1 = element[0]
        } else {
          var elemento1 = element[1] + "";
          const myArray = elemento1.split(",");
          this.lblparam1 = myArray[1]
          if (myArray[0] != 'string') {
            this.form.controls['param1'].setValue(myArray[0]);
          }
          if (myArray[2] == 'Y') {
            this.lbBolean1 = true;
          }
        }
     
      }
      if (index === 1) {
        if (element[1] == 'string') {
          this.lblparam2 = element[0]
          this.visibleParam2 = true
          this.onFocusOutEvent('param2')
        } else {
          var elemento2 = element[1] + "";
          const myArray = elemento2.split(",");
          this.lblparam2 = myArray[1]

          this.visibleParam2 = true
          this.onFocusOutEvent('param2')

          if (myArray[0] != 'string') {
            this.form.controls['param2'].setValue(myArray[0]);
          }
          if (myArray[2] == 'Y') {
            this.lbBolean2 = true;
          } 
        }
       
      }
      if (index === 2) {
        if (element[1] == 'string') {
          this.lblparam3 = element[0]
          this.visibleParam3 = true
          this.onFocusOutEvent('param3')
        } else {
          var elemento3 = element[1] + "";
          const myArray = elemento3.split(",");
          this.lblparam3 = myArray[1]

          this.visibleParam3 = true
          this.onFocusOutEvent('param3')

          if (myArray[0] != 'string') {
            this.form.controls['param3'].setValue(myArray[0]);
          }
          if (myArray[2] == 'Y') {
            this.lbBolean3 = true;
          }
        }
        
      }
      if (index === 3) {
        if (element[1] == 'string') {
          this.lblparam4 = element[0]
          this.visibleParam4 = true
          this.onFocusOutEvent('param4')
        } else {

          var elemento4 = element[1] + "";
          const myArray = elemento4.split(",");
          this.lblparam4 = myArray[1]

          this.visibleParam4 = true
          this.onFocusOutEvent('param4')

          if (myArray[0] != 'string') {
            this.form.controls['param4'].setValue(myArray[0]);
          }
          if (myArray[2] == 'Y') {
            this.lbBolean4 = true;
          }
        }
        
      }
      if (index === 4) {
        if (element[1] == 'string') {
          this.lblparam5 = element[0]
          this.visibleParam5 = true
          this.onFocusOutEvent('param5')
        } else {

          var elemento5 = element[1] + "";
          const myArray = elemento5.split(",");
          this.lblparam5 = myArray[1]

          this.visibleParam5 = true
          this.onFocusOutEvent('param5')

          if (myArray[0] != 'string') {
            this.form.controls['param5'].setValue(myArray[0]);
          }
          if (myArray[2] == 'Y') {
            this.lbBolean5 = true;
          }
        }
        
      }
      if (index === 5) {
        if (element[1] == 'string') {
          this.lblparam6 = element[0]
          this.visibleParam6 = true
          this.onFocusOutEvent('param6')
        } else {

          var elemento6 = element[1] + "";
          const myArray = elemento6.split(",");
          this.lblparam6 = myArray[1]

          this.visibleParam6 = true
          this.onFocusOutEvent('param6')

          if (myArray[0] != 'string') {
            this.form.controls['param6'].setValue(myArray[0]);
          }
          if (myArray[2] == 'Y') {
            this.lbBolean6 = true;
          }
        }
        
      }


     /* debugger;
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
      if (index === 4) {
        this.lblparam5 = element[0]
        this.visibleParam5 = true
        this.onFocusOutEvent('param5')
      }
      if (index === 5) {
        this.lblparam6 = element[0]
        this.visibleParam6 = true
        this.onFocusOutEvent('param6')
      }
      */
    });
    this.selectId = dataSelect?.ID
  }

  viewgetProfile(): void {
    this.lbBolean1 = false;
    this.lbBolean2 = false;
    this.lbBolean3 = false;
    this.lbBolean4 = false;
    this.lbBolean5 = false;
    this.lbBolean6 = false;
    this.spinner = true
    const $getview = this.reprocesoService
      .viewProfile(this.data?.id || 2)
      .pipe(finalize(() => this.spinner = false))
      .subscribe((response: any) => {
        Object.entries(JSON.parse(response[0]?.JSON)).forEach((element, index) => {
         
          if (index === 0) {
            if (element[1] == 'string'){
              this.lblparam1 = element[0]
            } else {
              var elemento1 = element[1] + "";
              const myArray = elemento1.split(",");
              this.lblparam1 = myArray[1]
              if (myArray[0] != 'string') {
                this.form.controls['param1'].setValue(myArray[0]);
              }
              if (myArray[2] == 'Y') {
                this.lbBolean1 = true;
              }
            }
         
          }
          if (index === 1) {
            if (element[1] == 'string') {
              this.lblparam2 = element[0]
              this.visibleParam2 = true
              this.onFocusOutEvent('param2')
            } else {
              var elemento2 = element[1] + "";
              const myArray = elemento2.split(",");
              this.lblparam2 = myArray[1]

              this.visibleParam2 = true
              this.onFocusOutEvent('param2')

              if (myArray[0] != 'string') {
                this.form.controls['param2'].setValue(myArray[0]);
              }
              if (myArray[2] == 'Y') {
                this.lbBolean2 = true;
              }
            }
           
          }
          if (index === 2) {
            if (element[1] == 'string') {
              this.lblparam3 = element[0]
              this.visibleParam3 = true
              this.onFocusOutEvent('param3')
            } else {
              var elemento3 = element[1] + "";
              const myArray = elemento3.split(",");
              this.lblparam3 = myArray[1]

              this.visibleParam3 = true
              this.onFocusOutEvent('param3')

              if (myArray[0] != 'string') {
                this.form.controls['param3'].setValue(myArray[0]);
              }
              if (myArray[2] == 'Y') {
                this.lbBolean3 = true;
              }
            }
            
          }
          if (index === 3) {
            if (element[1] == 'string') {
              this.lblparam4 = element[0]
              this.visibleParam4 = true
              this.onFocusOutEvent('param4')
            } else {

              var elemento4 = element[1] + "";
              const myArray = elemento4.split(",");
              this.lblparam4 = myArray[1]

              this.visibleParam4 = true
              this.onFocusOutEvent('param4')

              if (myArray[0] != 'string') {
                this.form.controls['param4'].setValue(myArray[0]);
              }
              if (myArray[2] == 'Y') {
                this.lbBolean4 = true;
              }
            }
            
          }
          if (index === 4) {
            if (element[1] == 'string') {
              this.lblparam5 = element[0]
              this.visibleParam5 = true
              this.onFocusOutEvent('param5')
            } else {

              var elemento5 = element[1] + "";
              const myArray = elemento5.split(",");
              this.lblparam5 = myArray[1]

              this.visibleParam5 = true
              this.onFocusOutEvent('param5')

              if (myArray[0] != 'string') {
                this.form.controls['param5'].setValue(myArray[0]);
              }
              if (myArray[2] == 'Y') {
                this.lbBolean5 = true;
              }
            }
            
          }
          if (index === 5) {
            if (element[1] == 'string') {
              this.lblparam6 = element[0]
              this.visibleParam6 = true
              this.onFocusOutEvent('param6')
            } else {

              var elemento6 = element[1] + "";
              const myArray = elemento6.split(",");
              this.lblparam6 = myArray[1]

              this.visibleParam6 = true
              this.onFocusOutEvent('param6')

              if (myArray[0] != 'string') {
                this.form.controls['param6'].setValue(myArray[0]);
              }
              if (myArray[2] == 'Y') {
                this.lbBolean6 = true;
              }
            }
            
          }

          
        });
        this.selectId = response[0]?.ID
       // console.log(this.selectId)
      this.form.controls['perfil'].setValue(this.selectId);
        this.perfilOptionsCopy = response;
        this.perfilOptions = (response || []).map((item: any) => ({
          label: item?.NOMBRE?.toUpperCase(),
          value: item?.ID,
        }))
      })
    this.arrayToDestroy.push($getview);
  }
}