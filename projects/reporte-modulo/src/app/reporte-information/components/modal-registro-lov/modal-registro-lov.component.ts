import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { ReporteService } from '../../../core/services/reporte.service';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { ReporteLov } from '../../../shared/models/reporte-lov.model';
import { ReporteParam } from '../../../shared/models/reporte-param.model';
import { Reporte } from '../../../shared/models/reporte.model';

@Component({
  selector: 'app-modal-registro-lov',
  templateUrl: './modal-registro-lov.component.html',
  styleUrls: ['./modal-registro-lov.component.scss'],
})
export class ModalRegistroLovComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  spinner: boolean;
  loading: boolean;
  listTipoLov: Array<DropdownItem>;

 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReporteLov,
    public dialogRef: MatDialogRef<ModalRegistroLovComponent>,
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef,
    private reporteService: ReporteService,
    private toastr: ToastrService,
  ) {
    super();
  }
  
  ngOnInit(): void {
    this.createForm();
    this.getListaLov();
  }

  getListaLov(): void {
    this.listTipoLov = new Array<DropdownItem>();
    this.listTipoLov.push({ label: "Consulta SQL", value: "1" })
    this.listTipoLov.push({ label: "Datos Fijos", value: "2" })

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
 debugger;
    this.form = this.formBuilder.group({
      Id: [this.data.Id,[Validators.required]],
      IdLov: [this.data.IdLov],
      NombreLov: [this.data.NombreLov, [Validators.required]],
      TipoLov: [this.data.TipoLov?.toString(), [Validators.required]],
      CampoValor: [this.data.CampoValor],
      CampoKey: [this.data.CampoKey],
      TablaConsulta: [this.data.TablaConsulta],
      QueryWhere: [this.data.QueryWhere],
      Query: [this.data.Query],
      Usuario: [this.data.Usuario],
      Estado: [this.data.Estado],
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }
  onChangeForm() {
      var nombreLov =this.form.value.NombreLov;
      var tipoLov = this.form.value.TipoLov;
    if (this.form.value.TipoLov == '1') {
      this.form = this.formBuilder.group({
        Id: [this.data.Id,[Validators.required]],
        IdLov: [this.data.IdLov],
        NombreLov: [nombreLov, [Validators.required]],
        TipoLov: [tipoLov?.toString(), [Validators.required]],
        CampoValor: [this.data.CampoValor, [Validators.required]],
        CampoKey: [this.data.CampoKey, [Validators.required]],
        TablaConsulta: [this.data.TablaConsulta, [Validators.required]],
        QueryWhere: [this.data.QueryWhere, [Validators.required]],
        Query: [this.data.Query],
        Usuario: [this.data.Usuario],
        Estado: [this.data.Estado],
      });
      this.form.valueChanges.subscribe(() => {
        this.formInvalid.emit(this.form.invalid);
      });
    } else {
      this.form = this.formBuilder.group({
        Id: [this.data.Id,[Validators.required]],
        IdLov: [this.data.IdLov],
        NombreLov: [nombreLov],
        TipoLov: [tipoLov?.toString()],
        CampoValor: [this.data.CampoValor],
        CampoKey: [this.data.CampoKey],
        TablaConsulta: [this.data.TablaConsulta],
        QueryWhere: [this.data.QueryWhere],
        Query: [this.data.Query, [Validators.required]],
        Usuario: [this.data.Usuario],
        Estado: [this.data.Estado],
      });
      this.form.valueChanges.subscribe(() => {
        this.formInvalid.emit(this.form.invalid);
      });
    }
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


  MergeLov() {
    this.spinner = true;
    this.reporteService.postTsFahModuloReporteLovMergeWS(this.form.value).subscribe(rest => {
      if (rest?.status == 'OK') {
        this.dialogRef.close(this.form.value);
        this.toastr.success(rest?.message, 'Registrado')
      } else {
        this.toastr.error(rest?.message, 'Error')
      }
      this.spinner = false;
    
    },
      () => {
        this.spinner = false;
      });
  }
  save(): void {
    if (this.form.valid) {
      this.spinner = true;
      const valueForm = this.form.value;
      this.MergeLov();
    
    }
  }
}
