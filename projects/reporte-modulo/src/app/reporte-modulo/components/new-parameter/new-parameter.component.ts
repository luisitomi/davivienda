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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewParameterComponent>,
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef,
    private reporteEjecucion: ReporteEjecucionService,
    private reporteService: ReporteService
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

      parametros: this.formBuilder.array([this.formBuilder.group({
  
        NumeroParametro: [1, [Validators.required]],
        NombreParametro: [null, [Validators.required]],
        ValorParametro: [null, [Validators.required]],
        TipoParametro : [null, [Validators.required]],
        Obligatorio : [null, [Validators.required]],
      })])
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }
  changeOption(event: any){
    this.form.patchValue({
      Id: event?.value,
    });
    console.log('event?.Id'+event?.value)
    this.postTsFAHBuscarParametrosModuloReportePorIdWS(event?.value);
  }
  delInput(id: number): void {
    this.items.removeAt(id);
  }

  get items() {
    return this.form.get("parametros") as FormArray;
  }
  
  updateItem() {   
    this.delInput(0);
    console.log('this.informationsParam:' +this.informationsParam)
    this.informationsParam?.forEach((currentValue, index) => {

      this.items.push(this.formBuilder.group({
        NumeroParametro: [currentValue.NumeroParametro, [Validators.required]],
        NombreParametro: [currentValue.NombreParametro, [Validators.required]],
        ValorParametro: [currentValue.ValorParametro, [Validators.required]],
        TipoParametro: [currentValue.TipoParametro, [Validators.required]],
        Obligatorio : [currentValue.Obligatorio, [Validators.required]],
      }));
    });
    console.log(this.form.value);
  }

  postTsFAHBuscarParametrosModuloReportePorIdWS(IdReporte: number) {
    this.reporteEjecucion.postTsFAHParametrosEjecucionModuloReporteWS({Id:IdReporte}).subscribe(rest =>{
     this.informationsParam = rest;
     console.log('postTsFAHBuscarParametrosModuloReportePorIdWS'+ rest)
     console.log(rest)
   // this.updateItem();
    });
  }
  getListReportes(): void {
    const $listReportestype = this.reporteEjecucion
      .getTsFAHListarReportesParaEjecucionWS()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any[]) => {
          this.listReportestype = (response || []).map((data) => ({
            label: data?.NombreReporte,
            value: data?.Id,
          }),
        )}
      );
    this.arrayToDestroy.push($listReportestype);
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  getTsFAHListarReportesParaEjecucionWS() {
    this.reporteEjecucion.getTsFAHListarReportesParaEjecucionWS().subscribe(res => {
      this.lstReporte = res;
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

    console.log(this.informationsParam)
    if (this.form.valid) {
      this.spinner = true;
      const valueForm = this.form.value;
      const request = {
        LengderId: valueForm?.lengerId,
        CC: valueForm?.cc,
        Dni: valueForm?.dni,
      }
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
