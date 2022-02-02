import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ReporteService } from '../../../core/services/reporte.service';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { Reporte } from '../../../shared/models/reporte.model';

@Component({
  selector: 'app-registro-reporte',
  templateUrl: './registro-reporte.component.html',
  styleUrls: ['./registro-reporte.component.scss'],
})
export class RegistroReporteComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() reporteRegistrado = new EventEmitter<Reporte>();

  filtrosForm: FormGroup;
  spinner: boolean;
  //listType = [];
  listType: Array<DropdownItem>;
  listObligatorio: Array<DropdownItem>;
  reporte:Reporte;
  constructor(
    private formBuilder: FormBuilder,
    private reporteService: ReporteService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    console.log('idss:'+id);
    this.getTypeParam();
    this.getObligatorio();
    this.createForm();
    this.postTsFAHBuscarModuloReportePorIdWS(id);
    if (id == undefined || id == null || id == 0) {
   
    } else {
    
    }
  }
  updateForm(): void {
 
    this.filtrosForm.patchValue({
      Id: this.reporte.Id,
      NombreReporte:this.reporte.NombreReporte,
      CodigoReporte:this.reporte.CodigoReporte,
      RutaReporte:this.reporte.RutaReporte,
      RutaSalidaFTPS:this.reporte.RutaSalidaFTPS,
      NombreArchivo:this.reporte.NombreArchivo,
      CantidadLinea:this.reporte.CantidadLinea,
      CreadoPor:this.reporte.CreadoPor,
    }) 

  }

  updateItem() {   
    this.delInput(0);
    this.reporte.parametros?.forEach((currentValue, index) => {
      
      this.items.push(this.formBuilder.group({
        IdParam:[currentValue.IdParam],
        NumeroParametro: [currentValue.NumeroParametro, [Validators.required]],
        NombreParametro: [currentValue.NombreParametro, [Validators.required]],
        ValorParametro: [currentValue.ValorParametro, [Validators.required]],
        TipoParametro: [currentValue.TipoParametro, [Validators.required]],
        Obligatorio : [currentValue.Obligatorio, [Validators.required]],
      }));
    });
   
  }



  createForm(): void {
    this.filtrosForm = this.formBuilder.group({
      Id: [0, [Validators.required]],
      NombreReporte: [null, [Validators.required]],
      CodigoReporte: [null, [Validators.required]],
      RutaReporte: [null, [Validators.required]],
      RutaSalidaFTPS: [null, [Validators.required]],
      NombreArchivo: [null, [Validators.required]],
      CantidadLinea: [null, [Validators.required]],
      CreadoPor: [null],
      parametros: this.formBuilder.array([this.formBuilder.group({
        IdParam: [0],
        NumeroParametro: [1, [Validators.required]],
        NombreParametro: [null, [Validators.required]],
        ValorParametro: [null, [Validators.required]],
        TipoParametro : [null, [Validators.required]],
        Obligatorio : [null, [Validators.required]],
      })])
    });
    this.filtrosForm.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.filtrosForm.invalid);
    });
  }

  createItem() {
    
    this.items.push(this.formBuilder.group({
      IdParam:[0],
      NumeroParametro: [this.items.length+1, [Validators.required]],
      NombreParametro: [null, [Validators.required]],
      ValorParametro: [null, [Validators.required]],
      TipoParametro: [null, [Validators.required]],
      Obligatorio : [null, [Validators.required]],
    }));
  }

  delInput(id: number): void {
    this.items.removeAt(id);
  }

  get items() {
    return this.filtrosForm.get("parametros") as FormArray;
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
  getTypeParam(): void {
    const $listType = this.reporteService
      .getTsFAHModuloReporteTipoParametrosWS()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any[]) => {
          this.listType = (response || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo ,
          }),
        )}
      );
    this.arrayToDestroy.push($listType);
  }

  getObligatorio(): void {
   /* const $listObligatorio = this.reporteService
      .getTsFAHModuloReporteTipoParametrosWS()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any[]) => {
          this.listType = (response || []).map((data) => ({
            label: data?.codigo,
            value: data?.valor,
          }),
        )}
      ); */
      this.listObligatorio = new Array<DropdownItem>();
      this.listObligatorio.push({label:"SI",value:"Y"})
      this.listObligatorio.push({label:"NO",value:"N"})
  //  this.arrayToDestroy.push($listObligatorio);
  }
  postTsFAHBuscarModuloReportePorIdWS(IdReporte: number) {
    this.reporteService.postTsFAHBuscarModuloReportePorIdWS({Id:IdReporte}).subscribe(rest =>{
      this.reporte = rest;
      console.log('rest id')
      console.log(this.reporte)
      this.updateForm();
      this.postTsFAHBuscarParametrosModuloReportePorIdWS(IdReporte);
    });
  }
  postTsFAHBuscarParametrosModuloReportePorIdWS(IdReporte: number) {

    this.reporteService.postTsFAHBuscarParametrosModuloReportePorIdWS({Id:IdReporte}).subscribe(rest =>{
      this.reporte.parametros = rest;
      this.updateItem();
    });
  }
  guardar() {
   const dataform =  this.filtrosForm.value;
   this.reporte = dataform;
   debugger;
    if (this.filtrosForm.valid) {

      if (this.reporte.Id ==   0 ) {
            console.log(JSON.stringify(this.filtrosForm.getRawValue()))
            console.log(this.filtrosForm.getRawValue())
            this.reporteService.postTsFahModuloReporteRegistrarWS(this.filtrosForm.getRawValue(),'Prueba').subscribe(rest => {
              console.log('rst')
              console.log(JSON.stringify(rest))
              this.filtrosForm.controls['Id'].setValue(rest.data.Id) ;
            });
      } else {
            console.log(JSON.stringify(this.filtrosForm.getRawValue()))
            console.log(this.filtrosForm.getRawValue())
            this.reporteService.postTsFahModuloReporteRegistrarWS(this.filtrosForm.getRawValue(),'Prueba').subscribe(rest => {
              console.log('rst')
              console.log(JSON.stringify(rest))
             // this.filtrosForm.controls['Id'].setValue(rest.data.Id) ;
            });
      }
      
    } else{
      this.filtrosForm.markAllAsTouched();
    } 
  }
  showErrors(control: string): boolean {
    return (
      (this.filtrosForm.controls[control].dirty || this.filtrosForm.controls[control].touched) &&
      !isEmpty(this.filtrosForm.controls[control].errors)
    );
  }
}
