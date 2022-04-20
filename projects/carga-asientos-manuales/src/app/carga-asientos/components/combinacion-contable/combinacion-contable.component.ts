import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { CombinacionContable } from '../../models/combinacion-contable.model';
import { Maestra } from '../../models/maestra.model';
import { CombinacionContableService } from '../../services/combinacion-contable.service';

@Component({
  selector: 'app-combinacion-contable',
  templateUrl: './combinacion-contable.component.html',
  styleUrls: ['./combinacion-contable.component.scss']
})
export class CombinacionContableComponent extends UnsubcribeOnDestroy implements OnInit, AfterViewChecked {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  filteredParte1Options: Observable<DropdownItem[]>;
  parte1Options: Array<DropdownItem> = [];
  parte2Options: Array<DropdownItem> = [];
  parte3Options: Array<DropdownItem> = [];
  parte4Options: Array<DropdownItem> = [];
  parte5Options: Array<DropdownItem> = [];
  parte6Options: Array<DropdownItem> = [];
  parte7Options: Array<DropdownItem> = [];
  parte8Options: Array<DropdownItem> = [];
  parte9Options: Array<DropdownItem> = [];
  parte10Options: Array<DropdownItem> = [];
  parte11Options: Array<DropdownItem> = [];
  loading = false;
  comp1Select: string;
  comp2Select: string;
  comp3Select: string;
  comp4Select: string;
  comp5Select: string;
  comp6Select: string;
  comp7Select: string;
  comp8Select: string;
  comp9Select: string;
  comp10Select: string;
  comp11Select: string;
  spinner: boolean;
  validateClient: string;
  valueId1: string;
  valueId2: string;
  addCuenta: any;
  addSucursal: any;
  addOficina: any;
  addProyecto: any;
  addSubProyecto: any;
  addTipoComprobante: any;
  addIntercompañia: any;
  addVinculado: any;
  addFuturo1: any;
  addFuturo2: any;

  constructor(
    public dialogRef: MatDialogRef<CombinacionContableComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private combinacionContableService: CombinacionContableService,
  ) {
    super();
    dialogRef.disableClose = true
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      comp1: [null, [Validators.required]],
      comp2: [null, [Validators.required]],
      comp3: [null, [Validators.required]],
      comp4: [null, [Validators.required]],
      comp5: [null, [Validators.required]],
      comp6: [null, [Validators.required]],
      comp7: [null, [Validators.required]],
      comp8: [null, [Validators.required]],
      comp9: [null, [Validators.required]],
      comp10: [null, [Validators.required]],
      comp11: [null, [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.getOptions1();
    this.getOptions2();
    this.getOptions4();
    this.getOptions6();
    this.getOptions7();
    this.getOptions8();
    this.getOptions9();
    this.getOptions10();
    this.createForm();
  }

  updateForm(): void {
    this.form.patchValue({
      comp1: this.data?.data?.Company,
      comp2: this.data?.data?.SegGlAccount,
      comp3: this.data?.data?.SegOficina,
      comp4: this.data?.data?.SegSucursal,
      comp5: this.data?.data?.SegProyecto,
      comp6: this.data?.data?.SegSubProyecto,
      comp7: this.data?.data?.SegTipoComprobante,
      comp8: this.data?.data?.SegIntecompany,
      comp9: this.data?.data?.SegVinculado,
      comp10: this.data?.data?.SegF1,
      comp11: this.data?.data?.SegF2,
    });
    this.comp1Select = this.data?.data?.Company;
    this.getOptions5(this.data?.data?.Company.split(' ')[0])
    this.comp2Select = this.data?.data?.SegGlAccount;
    this.comp3Select = this.data?.data?.SegOficina;
    this.comp4Select = this.data?.data?.SegSucursal;
    this.getOptions3(this.comp4Select);
    this.comp5Select = this.data?.data?.SegProyecto;
    this.comp6Select = this.data?.data?.SegSubProyecto;
    this.comp7Select = this.data?.data?.SegTipoComprobante;
    this.comp8Select = this.data?.data?.SegIntecompany;
    this.comp9Select = this.data?.data?.SegVinculado;
    this.comp10Select = this.data?.data?.SegF1;
    this.comp11Select = this.data?.data?.SegF2;
    this.validateClient = this.data?.data?.SegGlAccountValue;
    this.addFunctions();
  }

  showErrors(control: string): boolean {
    return (
      (this.form.controls[control].dirty || this.form.controls[control].touched) &&
      !isEmpty(this.form.controls[control].errors)
    );
  }

  validate(): ValidationErrors {
    return { required: true };
  }

  private _filterParte1(name: string): DropdownItem[] {
    const filterValue = name.toLowerCase();
    return this.parte1Options.filter(option => option.value?.toLowerCase().includes(filterValue));

  }

  getOptions1(): void {
    this.spinner = true;
    const $option1 = this.combinacionContableService
      .getParte1()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (parte1: Maestra[]) => {
          this.parte1Options = (parte1 || []).map((data) => ({
            label: `${data?.codigo} - ${data?.valor}`,
            value: data?.codigo,
            type: data?.codigo
          }))
          this.filteredParte1Options = this.form.controls['comp1'].valueChanges.pipe(
            startWith(''),
            map(value => (typeof value === 'string' ? value : value?.name)),
            map(name => (name ? this._filterParte1(name) : this.parte1Options.slice())),
          );
        }
      );
    this.arrayToDestroy.push($option1);
  }

  getOptions2(): void {
    this.spinner = true
    const $option2 = this.combinacionContableService
      .getParte2()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (parte2: Maestra[]) => {
          this.parte2Options = (parte2 || []).map((data) => ({
            label: `${data?.codigo} - ${data?.valor}`,
            value: data?.codigo,
            type: data?.REQUIERE_IDENTIFICACION_CLI
          }))
        }
      );
    this.arrayToDestroy.push($option2);
  }

  changeSelection(event: any): void {
    this.getOptions3(event?.value);
    this.valueId1 = event?.value;
  }

  getOptions3(name: string): void {
    this.spinner = true
    const $option3 = this.combinacionContableService
      .getParte3(name)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (parte3: any[]) => {
          this.parte3Options = (parte3 || []).map((data) => ({
            label: `${data?.value} - ${data?.description_name}`,
            value: data?.value,
          }))
        }
      );
    this.arrayToDestroy.push($option3);
  }

  getOptions4(): void {
    this.spinner = true
    const $option4 = this.combinacionContableService
      .getParte4()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (parte4: Maestra[]) => {
          this.parte4Options = (parte4 || []).map((data) => ({
            label: `${data?.codigo} - ${data?.valor}`,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option4);
  }

  getOptions5(name: string): void {
    this.spinner = true;
    const $option5 = this.combinacionContableService
      .getParte5(name)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (parte5: Maestra[]) => {
          this.parte5Options = (parte5 || []).map((data) => ({
            label: `${data?.codigo} - ${data?.valor}`,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option5);
  }

  getOptions6(): void {
    this.spinner = true
    const $option6 = this.combinacionContableService
      .getParte6()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (parte6: Maestra[]) => {
          this.parte6Options = (parte6 || []).map((data) => ({
            label: `${data?.codigo} - ${data?.valor}`,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option6);
  }

  getOptions7(): void {
    this.spinner = true
    const $option7 = this.combinacionContableService
      .getParte7()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (parte7: Maestra[]) => {
          this.parte7Options = (parte7 || []).map((data) => ({
            label: `${data?.codigo} - ${data?.valor}`,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option7);
  }

  getOptions8(): void {
    this.spinner = true
    const $option8 = this.combinacionContableService
      .getParte8()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (parte8: Maestra[]) => {
          this.parte8Options = (parte8 || []).map((data) => ({
            label: `${data?.codigo} - ${data?.valor}`,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option8);
  }

  getOptions9(): void {
    this.spinner = true
    const $option9 = this.combinacionContableService
      .getParte9()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (parte9: Maestra[]) => {
          this.parte9Options = (parte9 || []).map((data) => ({
            label: `${data?.codigo} - ${data?.valor}`,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option9);
  }

  getOptions10(): void {
    this.spinner = true
    const $option10 = this.combinacionContableService
      .getParte10()
      .pipe(finalize(() => this.getOptions11()))
      .subscribe(
        (parte10: Maestra[]) => {
          this.parte10Options = (parte10 || []).map((data) => ({
            label: `${data?.codigo} - ${data?.valor}`,
            value: data?.codigo,
          }))
        }
      );
    this.arrayToDestroy.push($option10);
  }

  getOptions11(): void {
    this.spinner = true
    const $option11 = this.combinacionContableService
      .getParte11()
      .pipe(finalize(() => {
        if (this.data?.type === appConstants.typeEvent.EDIT) {
          this.updateForm();
        }
      }))
      .subscribe(
        (parte11: Maestra[]) => {
          this.parte11Options = (parte11 || []).map((data) => ({
            label: `${data?.codigo} - ${data?.valor}`,
            value: data?.codigo,
          }))
          this.spinner = false;
        }
      );
    this.arrayToDestroy.push($option11);
  }

  onFocusOutEvent(control: string) {
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
    if (control === 'comp2') {
      this.validateClient = this.parte2Options.find(p => p.value === this.form.get(`${control}`)?.value)?.type || '';
    }
    this.form.get(`${control}`)?.updateValueAndValidity();
    if (control === 'comp1') {
      this.getOptions5(this.form.get(`${control}`)?.value?.split(' ')[0]);
      this.valueId2 = this.form.get(`${control}`)?.value?.split(' ')[0];
    }
  }

  save(): void {
    if (this.form.valid) {
      const valueForm = this.form.value;
      const request: CombinacionContable = {
        Company: valueForm.comp1,
        SegGlAccount: valueForm.comp2,
        SegOficina: valueForm.comp3,
        SegSucursal: valueForm.comp4,
        nameSucursal: this.parte1Options.find(p => p.value === valueForm.comp4)?.label || '',
        SegProyecto: valueForm.comp5,
        SegSubProyecto: valueForm.comp6,
        SegTipoComprobante: valueForm.comp7,
        SegGlAccountValue: this.validateClient || 'N',
        SegIntecompany: valueForm.comp8,
        SegVinculado: valueForm.comp9,
        SegF1: valueForm.comp10,
        SegF2: valueForm.comp11,
        ValueInformation: `${this.parte1Options.find(p => p.label === valueForm.comp1)?.value}-${valueForm.comp2}-${valueForm.comp3}-${valueForm.comp4}-${valueForm.comp5}-${valueForm.comp6}-${valueForm.comp7}-${valueForm.comp8}-${valueForm.comp9}-${valueForm.comp10}-${valueForm.comp11}`,
        addCuenta: this.addCuenta,
        addFuturo1: this.addFuturo1,
        addFuturo2: this.addFuturo2,
        addIntercompañia: this.addIntercompañia,
        addOficina: this.addOficina,
        addProyecto: this.addProyecto,
        addSubProyecto: this.addSubProyecto,
        addSucursal: this.addSucursal,
        addTipoComprobante: this.addTipoComprobante,
        addVinculado: this.addVinculado,
      }
      this.dialogRef.close(request);
    }
  }

  optionAdd(event: any): void {
    switch (event?.label) {
      case appConstants.segment.Cuenta:
        const id_2 = this.parte2Options.find(p => p.value?.toString() === event?.result?.codigo?.toString())
        if (!id_2) {
          this.parte2Options.unshift({
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          })
          this.addCuenta = {
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          }
        }
        this.comp2Select = event?.result?.codigo
        this.validateClient = event?.result?.tipo || 'N'
        break;
      case appConstants.segment.Compania:
        const id_1 = this.parte1Options.find(p => p.value?.toString() === event?.result?.codigo?.toString())
        if (!id_1) {
          this.parte1Options.unshift({
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.codigo,
          })
        }
        this.comp1Select = event?.result?.codigo
        break;
      case appConstants.segment.Futuro_1:
        const id_10 = this.parte10Options.find(p => p.value?.toString() === event?.result?.codigo?.toString())
        if (!id_10) {
          this.parte10Options.unshift({
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          })
          this.addFuturo1 = {
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          }
        }
        this.comp10Select = event?.result?.codigo
        break;
      case appConstants.segment.Intercompañía:
        const id_8 = this.parte8Options.find(p => p.value?.toString() === event?.result?.codigo?.toString())
        if (!id_8) {
          this.parte8Options.unshift({
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          })
          this.addIntercompañia = {
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          }
        }
        this.comp8Select = event?.result?.codigo
        break;
      case appConstants.segment.Futuro_2:
        const id_11 = this.parte11Options.find(p => p.value?.toString() === event?.result?.codigo?.toString())
        if (!id_11) {
          this.parte11Options.unshift({
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          })
          this.addFuturo2 = {
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          }
        }
        this.comp11Select = event?.result?.codigo
        break;
      case appConstants.segment.Oficina:
        const id_3 = this.parte3Options.find(p => p.value?.toString() === event?.result?.codigo?.toString())
        if (!id_3) {
          this.parte3Options.unshift({
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          })
          this.addOficina = {
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          }
        }
        this.comp3Select = event?.result?.codigo
        break;
      case appConstants.segment.Proyecto:
        const id_5 = this.parte5Options.find(p => p.value?.toString() === event?.result?.codigo?.toString())
        if (!id_5) {
          this.parte5Options.unshift({
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          })
          this.addProyecto = {
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          }
        }
        this.comp5Select = event?.result?.codigo
        break;
      case appConstants.segment.Subproyecto:
        const id_6 = this.parte6Options.find(p => p.value?.toString() === event?.result?.codigo?.toString())
        if (!id_6) {
          this.parte6Options.unshift({
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          })
          this.addSubProyecto = {
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          }
        }
        this.comp6Select = event?.result?.codigo
        break;
      case appConstants.segment.Sucursal:
        const id_4 = this.parte4Options.find(p => p.value?.toString() === event?.result?.codigo?.toString())
        if (!id_4) {
          this.parte4Options.unshift({
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          })
          this.addSucursal = {
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          }
        }
        this.comp4Select = event?.result?.codigo
        this.getOptions3(event?.result?.codigo);
        this.valueId1 = event?.result?.codigo;
        break;
      case appConstants.segment.Tipo_Comprobante:
        const id_7 = this.parte7Options.find(p => p.value?.toString() === event?.result?.codigo?.toString())
        if (!id_7) {
          this.parte7Options.unshift({
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          })
          this.addTipoComprobante = {
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          }
        }
        this.comp7Select = event?.result?.codigo
        break;
      case appConstants.segment.Vinculado:
        const id_9 = this.parte9Options.find(p => p.value?.toString() === event?.result?.codigo?.toString())
        if (!id_9) {
          this.parte9Options.unshift({
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          })
          this.addVinculado = {
            label: `${event?.result?.codigo} - ${event?.result?.valor}`,
            value: event?.result?.codigo,
            type: event?.result?.tipo,
          }
        }
        this.comp9Select = event?.result?.codigo
        break;
    }
  }

  addFunctions(): void {
    const cuenta_functions: any = this.parte2Options.find(p => p.value === this.data?.data?.addCuenta?.value);
    if (cuenta_functions === -1){
      this.parte2Options.unshift(this.data?.data?.addCuenta)
    }
    const oficina_functions: any = this.parte3Options.find(p => p.value === this.data?.data?.addOficina?.value);
    if (oficina_functions === -1){
      this.parte3Options.unshift(this.data?.data?.addOficina)
    }
    const sucursal_functions: any = this.parte4Options.find(p => p.value === this.data?.data?.addSucursal?.value);
    if (sucursal_functions === -1){
      this.parte4Options.unshift(this.data?.data?.addSucursal)
    }
    const proyecto_functions: any = this.parte5Options.find(p => p.value === this.data?.data?.addProyecto?.value);
    if (proyecto_functions === -1){
      this.parte5Options.unshift(this.data?.data?.addProyecto)
    }
    const sub_proyecto_functions: any = this.parte6Options.find(p => p.value === this.data?.data?.addSubProyecto?.value);
    if (sub_proyecto_functions === -1){
      this.parte6Options.unshift(this.data?.data?.addSubProyecto)
    }
    const tipo_comprobante_functions: any = this.parte7Options.find(p => p.value === this.data?.data?.addTipoComprobante?.value);
    if (tipo_comprobante_functions === -1){
      this.parte7Options.unshift(this.data?.data?.addTipoComprobante)
    }
    const intercompañia_functions: any = this.parte8Options.find(p => p.value === this.data?.data?.addIntercompañia?.value);
    if (intercompañia_functions === -1){
      this.parte8Options.unshift(this.data?.data?.addIntercompañia)
    }
    const vinculado_functions: any = this.parte9Options.find(p => p.value === this.data?.data?.addVinculado?.value);
    if (vinculado_functions === -1){
      this.parte9Options.unshift(this.data?.data?.addVinculado)
    }
    const futuro_1_functions: any = this.parte10Options.find(p => p.value === this.data?.data?.addFuturo1?.value);
    if (futuro_1_functions === -1){
      this.parte10Options.unshift(this.data?.data?.addFuturo1)
    }
    const futuro_2_functions: any = this.parte11Options.find(p => p.value === this.data?.data?.addFuturo2?.value);
    if (futuro_2_functions === -1){
      this.parte11Options.unshift(this.data?.data?.addFuturo2)
    }
  }
}
