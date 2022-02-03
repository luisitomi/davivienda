import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ReporteEjecucionService } from '../../../core/services/reporte-ejecucion.service';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { ReporteParam } from '../../../shared/models/reporte-param.model';
import { Reporte } from '../../../shared/models/reporte.model';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { ReporteService } from '../../../core/services/reporte.service';
import { ParametrosReporteEjecucionParam } from '../../../shared/models/parametros-reporte-ejecucion.model';
import { ReporteEjecucionParam } from '../../../shared/models/reporte-ejecucion.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-new-parameter',
  templateUrl: './new-parameter.component.html',
  styleUrls: ['./new-parameter.component.scss'],
})
export class NewParameterComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  spinner: boolean;
  loading: boolean;
  displayedColumns: string[] = ['Nro', 'Parametro', 'Tipo', 'Valor'];
  reporte: Reporte;
  lstReporte: Reporte[];
  listReportestype : Array<DropdownItem>;
  //listObligatorio: Array<DropdownItem>;
  informationsParam: ParametrosReporteEjecucionParam[];
  ejecucionReporte:ReporteEjecucionParam;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewParameterComponent>,
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef,
    private reporteEjecucion: ReporteEjecucionService,
    private reporteService: ReporteService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    super();
  }
  
  ngOnInit(): void {
    this.createForm();
    this.getListReportes();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      Id:[0,[Validators.required]],
      Usuario: [null],
      parametros: this.formBuilder.array([])
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }
  changeOption(event: any){
    this.form.patchValue({
      Id: event?.value,
    });
    this.postTsFAHBuscarParametrosModuloReportePorIdWS(event?.value);
  }
  delInput(id: number): void {
    this.items.removeAt(id);
  }

  get items() {
    return this.form.get("parametros") as FormArray;
  }
  
  updateItem() {   
    this.informationsParam.splice(0, 0)
    this.informationsParam?.forEach((currentValue) => {
      this.items.push(this.formBuilder.group({
        NombreParametro: currentValue?.NombreParametro,
        ValorParametro: currentValue?.ValorParametro,
        TipoParametro: currentValue?.TipoParametro,
        Obligatorio : currentValue?.Obligatorio,
        NumeroParametro: currentValue?.NumeroParametro,
      }));
    });
  }

  postTsFAHBuscarParametrosModuloReportePorIdWS(IdReporte: number) {
    this.reporteEjecucion.postTsFAHParametrosEjecucionModuloReporteWS({Id:IdReporte}).subscribe(rest =>{
    this.informationsParam = rest;
    this.updateItem();
    });
  }
  getListReportes(): void {
    this.spinner = true;
    const $listReportestype = this.reporteEjecucion
      .getTsFAHListarReportesParaEjecucionWS()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any[]) => {
          this.listReportestype = (response || []).map((data) => ({
            label: data?.NombreReporte,
            value: data?.Id,
          }),
        )
        this.spinner = false;
      }
      );
    this.arrayToDestroy.push($listReportestype);
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  getTsFAHListarReportesParaEjecucionWS() {
    this.spinner = true;
    this.reporteEjecucion.getTsFAHListarReportesParaEjecucionWS().subscribe(res => {
      this.lstReporte = res;
      this.spinner = false;
    },
    ()=>{
      this.spinner = false;
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
    //aca tendras las modificaciones de los inputs

    if (this.form.valid) {
      this.spinner = true;
      const valueForm = this.form.value;
      /*
      const request = {
        LengderId: valueForm?.lengerId,
        CC: valueForm?.cc,
        Dni: valueForm?.dni,
      } */
     /* const header: CabeceraAsientoInsert = {
        Id: 0,
        LegderName: this.dataHeader?.leader,
        SourceName: this.dataHeader?.origen,
        TrxNumber: this.dataHeader?.number,
        AccountingDate: this.datePipe.transform(this.dataHeader?.accountingDate, appConstants.eventDate.format) || '',
        Description: this.dataHeader?.description,
        Company: '',
        Usuario: this.nombreUsuario,
        Period: this.dataHeader?.period,
      }*/
     
      const request = {
        Id: valueForm.Id,
        Usuario:this.authService.getUsuarioV2(),
        parametros:this.items.value
      }
      /*this.ejecucionReporte = new ReporteEjecucionParam();
      this.ejecucionReporte.Id = 0;
      this.ejecucionReporte.Usuario = "Usuario";
      this.ejecucionReporte.parametros = this.items.value;*/    
      
      this.reporteEjecucion.postTsFahModuloReporteEjecutarWS(request).subscribe(
        res => {
          this.spinner = false;
          this.toastr.success(res?.Mensaje, 'Registro');
          this.dialogRef.close();
        },()  =>{
          this.spinner = false;
          this.toastr.warning("Ocurrio un error inesperado", 'Advertencia');
        }
      );


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
