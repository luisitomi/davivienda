import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { ReporteService } from '../../../core/services/reporte.service';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { ReporteLov } from '../../../shared/models/reporte-lov.model';
import { Reporte } from '../../../shared/models/reporte.model';
import { InformacionAdicionalReporteComponent } from '../Informacion-adicional-reporte/informacion-adicional-reporte.component';
import { ModalRegistroLovComponent } from '../modal-registro-lov/modal-registro-lov.component';

@Component({
  selector: 'app-registro-reporte',
  templateUrl: './registro-reporte.component.html',
  styleUrls: ['./registro-reporte.component.scss'],
})
export class RegistroReporteComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() reporteRegistrado = new EventEmitter<Reporte>();
  displayedColumns: string[] = [ 'NombreLov', 'TipoLov', 'Accion'];
  informationsList: ReporteLov[];
  filtrosForm: FormGroup;
  spinner: boolean;
  loading = false;
  //listType = [];
  listType: Array<DropdownItem>;
  listObligatorio: Array<DropdownItem>;
  listExtension: Array<DropdownItem>;
  reporte: any;
  listLOV: Array<DropdownItem>;
  isDate: boolean;
  isNumber: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private reporteService: ReporteService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    this.createForm();
    this.getTypeParam();
    this.getObligatorio();
    this.getExtension();

    if (id == undefined || id == null || id == 0) {
      this.reporte = {
        Id: 0,
        NombreReporte: '',
        CodigoReporte: '',
        RutaReporte: '',
        RutaSalidaFTPS: '',
        NombreArchivo: '',
        CantidadLinea: 0,
        Pagina: 0,
        CreadoPor: '',
        Extension: '',
        Descripcion: '',
      };
      this.obtenerRutaFTP();
      this.obtenerCantidadRegistros();
    } else {
      this.postTsFAHBuscarModuloReportePorIdWS(id);
    }
  }

  changeOption(event: any): void {
    this.isNumber = event?.value === appConstants.typeDate.NUMERO;
    this.isDate = event?.value === appConstants.typeDate.FECHA;
  }

  asignarCodigoReporte() {
    const dataform = this.filtrosForm.value;
    this.reporte = dataform;
    this.filtrosForm.controls['CodigoReporte'].setValue(this.reporte.NombreReporte?.replace(" ", "_").toUpperCase())
  }

  updateForm(): void {
    this.filtrosForm.patchValue({
      Id: this.reporte.Id,
      NombreReporte: this.reporte.NombreReporte,
      CodigoReporte: this.reporte.CodigoReporte,
      RutaReporte: this.reporte.RutaReporte,
      RutaSalidaFTPS: this.reporte.RutaSalidaFTPS,
      NombreArchivo: this.reporte.NombreArchivo,
      CantidadLinea: this.reporte.CantidadLinea,
      CreadoPor: this.reporte.CreadoPor,
      Extension: this.reporte.Extension
    })
  }

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
        FormatoFecha: [currentValue.FormatoFecha],
        Visible:[currentValue.Visible, [Validators.required]],
        LovId:[currentValue.LovId],
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
      Extension: [null, [Validators.required]],
      parametros: this.formBuilder.array([this.formBuilder.group({
        IdParam: [0],
        NumeroParametro: [1, [Validators.required]],
        NombreParametro: [null, [Validators.required]],
        ValorParametro: [null],
        TipoParametro: [null, [Validators.required]],
        Obligatorio: [null, [Validators.required]],
        Descripcion: [null, [Validators.required]],
        Estado: [0, [Validators.required]],
        FormatoFecha: [null],
        Visible:[null, [Validators.required]],
        LovId:[null],
      })])
    });
    this.filtrosForm.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.filtrosForm.invalid);
    });
  }

  obtenerRutaFTP() {
    let request = {
      profile: "TS_RUTA_SFTP_MODULO_REPORTE"
    }
    this.reporteService.postTsObtenerPerfilWS(request).subscribe(
      res => this.filtrosForm.controls['RutaSalidaFTPS'].setValue(res.valor)
    );
  }

  obtenerCantidadRegistros() {
    let request = {
      profile: "TS_CANTIDAD_MODULO_REPORTE"
    }
    this.reporteService.postTsObtenerPerfilWS(request).subscribe(
      res => this.filtrosForm.controls['CantidadLinea'].setValue(res.valor)
    );
  }

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
      FormatoFecha: [null],
        Visible:[null, [Validators.required]],
        LovId:[null],
    }));
  }

  get ItemsTotal() {
    let number = 1;
    this.items.value.forEach((element: any) => {
      if (element.Estado != 2) {
        element.NumeroParametro = number;
        number++;
      }
    });
    return number as number;
  }


  delInput(id: number): void {
    if (this.reporte.Id != 0 && this.items.value[id].Estado != 0) {
      this.items.value[id].Estado = 2

      let number = 1;
      this.items.value.forEach((element: any) => {
        if (element.Estado != 2) {
          element.NumeroParametro = number;
          number++;
        }
      });
    } else {
      this.items.removeAt(id);
    }
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
            value: data?.codigo,
          }),
          )
        }
      );
    this.arrayToDestroy.push($listType);
  }

  getExtension(): void {
    this.listExtension = new Array<DropdownItem>();
    this.listExtension.push({ label: "CSV", value: "csv" })
    this.listExtension.push({ label: "TXT", value: "txt" })

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
    this.listObligatorio.push({ label: "SI", value: "Y" })
    this.listObligatorio.push({ label: "NO", value: "N" })
    //  this.arrayToDestroy.push($listObligatorio);
  }

  postTsFAHBuscarModuloReportePorIdWS(IdReporte: number) {
    this.spinner = true;
    this.reporteService.postTsFAHBuscarModuloReportePorIdWS({ Id: IdReporte }).subscribe(rest => {
      this.reporte = rest;
      this.spinner = false;
      this.updateForm();
      this.postTsFAHBuscarParametrosModuloReportePorIdWS(IdReporte);
      this.postTsFahModuloReporteLovListaWS();
    },
      () => {
        this.spinner = false;
      });
  }

  cancelar() {
    this.router.navigate(['/reporte-information/listado']);
  }

  postTsFAHBuscarParametrosModuloReportePorIdWS(IdReporte: number) {
    this.spinner = true;
    this.reporteService.postTsFAHBuscarParametrosModuloReportePorIdWS({ Id: IdReporte }).subscribe(rest => {
      this.reporte.parametros = rest;
      this.spinner = false;
      let number = 1;
      this.reporte.parametros.forEach((element: any) => {
        if (element.Estado != 2) {
          element.Index = number;
          number++;
        }
      });
      this.updateItem();
    },
      () => {
        this.spinner = false;
      });
  }

  guardar() {
    const dataform = this.filtrosForm.value;
    this.reporte = dataform;
    this.reporte.parametros = this.items.value;
    if (this.filtrosForm.valid) {
      this.spinner = true;
      if (this.reporte.Id == 0) {
        this.reporteService.postTsFahModuloReporteRegistrarWS(this.reporte, this.authService.getUsuarioV2()).subscribe(rest => {
          this.filtrosForm.controls['Id'].setValue(rest.data.Id);
          this.toastr.success(rest?.message, 'Registro');
          this.spinner = false;
          this.cancelar();
        //  this.postTsFAHBuscarModuloReportePorIdWS(rest.data.Id);
        },
          () => {
            this.spinner = false;
          });
      } else {

        this.reporteService.postTsFahModuloReporteRegistrarWS(this.reporte  , this.authService.getUsuarioV2()).subscribe(rest => {
          this.toastr.success(rest?.message, 'Registro');
          this.spinner = false;
          this.cancelar();
        //this.postTsFAHBuscarModuloReportePorIdWS(rest.data.Id);
        },
          () => {
            this.spinner = false;
          });
      }

    } else {
      this.filtrosForm.markAllAsTouched();
    }
  }

  showErrors(control: string): boolean {
    return (
      (this.filtrosForm.controls[control].dirty || this.filtrosForm.controls[control].touched) &&
      !isEmpty(this.filtrosForm.controls[control].errors)
    );
  }

  //------------

  addNewInformation(data: any): void {

   
      const dialogRef = this.dialog.open(InformacionAdicionalReporteComponent, {
        width: '80%',
        maxWidth: '1000px',
        data: data,
        panelClass: 'my-dialog',
      });

      dialogRef.afterClosed().subscribe(result => {
        data = result;
        console.log('resul Data: ',data);
        console.log('resul result: ',result);
      //  this.refrescar();
        if (result?.status) {
          this.toastr.success(result?.message, 'Registrado')

        }
      });
   
  }

  nuevo() {
    this.modalCrearLov(null);
  }

  modalCrearLov(data: any) {
    debugger;
    var dataLov = {};
    if (data == null) {
       dataLov = {
        Id:this.reporte.Id,
        IdLov:0,
        NombreLov:"",
        Query:"",
        Usuario:this.authService.getUsuarioV2(),
        Estado:"1"
      };
    } else{
      dataLov = data;
    }
    
    const dialogRef = this.dialog.open(ModalRegistroLovComponent, {
      width: '80%',
      maxWidth: '1000px',
      data: dataLov,
      panelClass: 'my-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
    //  data = result;
    //  console.log('resul Data: ',data);
      console.log('resul result: ',result);
    //  this.refrescar();
      if (result?.status) {
        this.toastr.success(result?.message, 'Registrado')

      }
      this.postTsFahModuloReporteLovListaWS();
    });
  }


  postTsFahModuloReporteLovListaWS() {
    debugger;
    const request = {
      Id:this.reporte.Id
    };
    this.spinner = true;
    this.reporteService.postTsFahModuloReporteLovListaWS(request).subscribe(rest => {
      this.informationsList = rest;
      this.spinner = false;
    
      this.listLOV = (this.informationsList || []).map((data) => ({
        label: data?.NombreLov,
        value: data?.IdLov?.toString(),
      }),
      );
    },
      () => {
        this.spinner = false;
      });
  }
  /*
  getLOVParam(): void {
    const $listType = this.reporteService
      .getTsFAHModuloReporteTipoParametrosWS()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any[]) => {
          this.listType = (response || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
          }),
          )
        }
      );
    this.arrayToDestroy.push($listType);
  } */
  eliminar(data: any) {

  }
}