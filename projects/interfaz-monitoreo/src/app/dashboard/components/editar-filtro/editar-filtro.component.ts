import { DatePipe } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { CorreccionFiltrosService } from '../../../core/services/correccion-filtros.service';
import { ReprocesoService } from '../../../core/services/reproceso.service';
import { CorreccionFiltro } from '../../../shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { Maestra } from '../../../shared/models/maestra.model';

@Component({
  selector: 'app-editar-filtro',
  templateUrl: './editar-filtro.component.html',
  styleUrls: ['./editar-filtro.component.scss'],
  providers: [DatePipe],
})
export class EditarFiltroComponent extends UnsubcribeOnDestroy implements OnInit, AfterViewChecked {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  editarFiltroForm: FormGroup;
  spinner: boolean;
  columnaOptions: Array<DropdownItem>;
  criterioOptions: Array<DropdownItem>;
  selectColumn: string;
  selectTerm: string;
  btnLabel: string;
  isNumber: boolean;
  isDate: boolean;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditarFiltroComponent>,
    @Inject(MAT_DIALOG_DATA) public filtro: CorreccionFiltro,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private reprocesoService: ReprocesoService,
    private correccionFiltrosService: CorreccionFiltrosService,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {
    super();
    dialogRef.disableClose = true;
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.getTypes();
    this.createForm();
    this.btnLabel = !this.filtro ? 'Agregar' : 'Cambiar';
    const origen = this.correccionFiltrosService.getOrigen();
    const tipoArchivo1 = this.correccionFiltrosService.getTipoArchivo() === appConstants.typeArchivo.HEADER
                          ? appConstants.typeArchivoValue.HEADER : this.correccionFiltrosService.getTipoArchivo()
                          === appConstants.typeArchivo.LINE ? appConstants.typeArchivoValue.LINE : appConstants.typeArchivoValue.NULL;
    this.getColumna(origen, tipoArchivo1);
  }

  createForm(): void {
    const dateFormat = this.filtro?.valor.split('/') || '';
    const dateValue = new Date(`${dateFormat[2]}/${dateFormat[1]}/${dateFormat[0]}`);
    this.editarFiltroForm = this.formBuilder.group({
      columna: [this.filtro?.columna, [Validators.required]],
      criterio: [this.filtro?.criterio, [Validators.required]],
      valor: [!isNaN(dateValue.getTime()) ? dateValue : this.filtro?.valor, [Validators.required]],
    });
    this.selectTerm = this.filtro?.criterio;
    this.isNumber = this.filtro?.tipo === appConstants.typeDate.NUMERICO;
    this.isDate = this.filtro?.tipo === appConstants.typeDate.FECHA;
    this.editarFiltroForm.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.editarFiltroForm.invalid);
    });
  }

  showErrors(control: string): boolean {
    return (
      (this.editarFiltroForm.controls[control].dirty || this.editarFiltroForm.controls[control].touched) &&
      !isEmpty(this.editarFiltroForm.controls[control].errors)
    );
  }

  changeOption(event: DropdownItem): void {
    this.isNumber = event?.type === appConstants.typeDate.NUMERICO;
    this.isDate = event?.type === appConstants.typeDate.FECHA;
  }

  onFocusOutEvent(control: string) {
    const validNumber = control === 'columna' && this.isNumber;
    const isDate = control === 'columna' && this.isDate;
    if (!this.editarFiltroForm.get(`${control}`)?.value && !validNumber) {
      this.editarFiltroForm.get(`${control}`)?.clearValidators();
      this.editarFiltroForm.get(`${control}`)?.setValidators([
        Validators.required,
        this.validate,
      ]);
    } else {
      if (validNumber) {
        this.editarFiltroForm.get(`valor`)?.clearValidators();
        this.editarFiltroForm.get(`valor`)?.setValidators([
          this.validateNumber,
        ]);
        this.editarFiltroForm.get(`valor`)?.updateValueAndValidity();
      } else {
        if (isDate) {
          this.editarFiltroForm.get(`valor`)?.clearValidators();
          this.editarFiltroForm.get(`valor`)?.setValidators([
            this.validateRequirementPeriod.bind(this),
          ]);
          this.editarFiltroForm.get(`valor`)?.updateValueAndValidity();
        } else {
          if (control === 'valor') {
            this.editarFiltroForm.get(`${control}`)?.clearValidators();
            this.editarFiltroForm.get(`${control}`)?.setValidators([
              Validators.required,
            ]);
            this.editarFiltroForm.get(`${control}`)?.updateValueAndValidity();
          } else {
            this.editarFiltroForm.get(`valor`)?.clearValidators();
            this.editarFiltroForm.get(`valor`)?.setValidators([
            ]);
            this.editarFiltroForm.get(`valor`)?.updateValueAndValidity();
          }
        }
      }      
    }
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

  validateNumber(): ValidationErrors {  
    return { invalidNumber: true };
  }

  getColumna(ori: string, tipo: number): void {
    this.spinner = true;
    const $columna = this.reprocesoService
      .postTsFahColumnaProcesoAHCWS(ori, tipo)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (data: Maestra[]) => {
          this.columnaOptions = (data || []).map((respone) => ({
            label: respone?.valor,
            value: respone?.valor,
            type: respone?.tipo,
          }));
          const value = data.find((p: Maestra) => p.valor === this.filtro?.columna);
          this.selectColumn = value?.valor || '';
        }
      );
    this.arrayToDestroy.push($columna);
  }

  getTypes(): void {
    this.spinner = true;
    this.criterioOptions = (DATA_TYPE_SELECT || []).map((data) => ({
      label: data,
      value: data,
    }));
    this.spinner = false;
  }

  send(): void {
    if (this.filtro === null) {
      this.correccionFiltrosService.addFiltro(this.editarFiltroForm.value);
    } else {
      this.correccionFiltrosService.editFiltro(this.editarFiltroForm.value);
    }
    this.guardar(this.editarFiltroForm.value);
  }

  guardar(filtro: CorreccionFiltro) {
    debugger;
    const objeto = {
      Columna:filtro.columna,
      Criterio:filtro.criterio,
      Valor:this.isDate ? this.datePipe.transform(filtro.valor, appConstants.eventDate.format) : filtro.valor,
      IdArchivoZip:this.correccionFiltrosService.getIdCarga(),
      TipoArchivo: this.correccionFiltrosService.getTipoArchivo(),
      TipoFiltro: "FILTRO",
      Usuario:this.authService.getUsuarioV2()
    }
    this.correccionFiltrosService.postTsRegistroCorreccionAHCWS(objeto).subscribe(
      res => {
        this.dialogRef.close('OK');
        
        if (this.filtro === null) {
          this.correccionFiltrosService.addFiltro(this.editarFiltroForm.value);
        } else {
          this.correccionFiltrosService.editFiltro(this.editarFiltroForm.value);
        } 
      }

    );
  }
}

const DATA_TYPE_SELECT = ['contiene', 'es igual a', 'mayor que'];