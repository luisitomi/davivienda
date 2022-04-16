import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { appConstants } from '../../app-constants/app-constants';
import { coerceBooleanProp } from '../../helpers/boolean.helper';
import { ModalComponent } from './modal/modal.component';
import { DropdownItem, EventDropdown } from './select.model';

type DropdownItemType = string | number | DropdownItem | any;

@Component({
  selector: 'app-select-filter',
  templateUrl: './selectFilter.component.html',
  styleUrls: ['./selectFilter.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectFilterComponent ), multi: true }],
})
export class SelectFilterComponent {
  @Input() complementary: boolean;
  @Input() label: string;
  @Input() valueId1: string;
  @Input() valueId2: string;
  @Output() changeOption: EventEmitter<EventDropdown> = new EventEmitter<EventDropdown>();
  @Input() placeholder: string;
  @Output() optionAdd: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatSelect, { static: true }) dropdown: MatSelect;
  @ViewChild('singleSelect') singleSelect: MatSelect;

  @Input() selected: DropdownItemType;

  @Input()
  get options(): Array<DropdownItem> {
    return this.inputOptions;
  }
  set options(items: Array<DropdownItem>) {
    if (Array.isArray(items)) {
      this.inputOptions = items;
    }
  }

  @Input()
  get options1(): Array<DropdownItem> {
    return this.inputOptions1;
  }
  set options1(items: Array<DropdownItem>) {
    if (Array.isArray(items)) {
      this.inputOptions1 = items;
    }
  }

  protected inputOptions: Array<DropdownItem>;
  protected inputOptions1: Array<DropdownItem>;

  @Input()
  get disabled(): boolean {
    return this.inputDisabled;
  }
  set disabled(value: boolean) {
    const disabled = coerceBooleanProp(value);
    if (this.inputDisabled !== disabled) {
      this.inputDisabled = disabled;
    }
  }

  protected inputDisabled = false;

  @Input()
  get error(): boolean {
    return this.inputError;
  }
  set error(value: boolean) {
    this.inputError = coerceBooleanProp(value);
  }

  protected inputError = false;

  @Input()
  get value(): DropdownItemType {
    return this.inputValue;
  }
  set value(value: DropdownItemType) {
    if (typeof value === 'object' && value) {
      value = value;
    }
    this.inputValue = value;
    if (!this.inputValue && this.dropdown) {
    } else if (typeof value === 'string' && value && this.dropdown && this.options) {
      if (!this.selected || this.selected.value !== value) {
        this.selected = this.options.find((o) => o.value === value);
      }
    }
    if (!this.disabled) {
      this.propagateChange(this.value);
    }
  }

  protected inputValue: DropdownItemType;

  propagateChange: any = () => {
    // propagate
  };

  changeDropdown(event: any): void {
    this.value = event?.value;
    this.changeOption.emit({
      originalEvent: event?.originalEvent,
      dropdownItem: event?.value,
      value: event?.value,
      type: this.options.find((o) => o.value === event?.value)?.type || '',
    });
  }

  search(event: any): void {
    let search = event?.target?.value;
    if (!search?.length) {
      this.options = this.options1
    } else {
      this.options = this.options1
      this.options = this.options.filter(option => (option.label || '').toLowerCase().indexOf(search?.toLowerCase()) > -1)
    }
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = typeof value === 'object' ? value?.value : value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerOnTouched(fn: any): void {
    // register;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor(
    private dialog: MatDialog,
  ){

  }

  modal(): void {
    let name = '';
    switch (this.label) {
      case appConstants.segment.Compania:
        name = appConstants.segmentValue.Compania
        break;      
      case appConstants.segment.Cuenta:
        name = appConstants.segmentValue.Cuenta
        break;
      case appConstants.segment.Futuro_1:
        name = appConstants.segmentValue.Futuro_1
        break;
      case appConstants.segment.Futuro_2:
        name = appConstants.segmentValue.Futuro_2
        break;
      case appConstants.segment.Intercompañía:
        name = appConstants.segmentValue.Intercompañía
        break;
      case appConstants.segment.Oficina:
        name = appConstants.segmentValue.Oficina
        break;
      case appConstants.segment.Proyecto:
        name = appConstants.segmentValue.Proyecto
        break;
      case appConstants.segment.Subproyecto:
        name = appConstants.segmentValue.Subproyecto
        break;
      case appConstants.segment.Sucursal:
        name = appConstants.segmentValue.Sucursal
        break;
      case appConstants.segment.Tipo_Comprobante:
        name = appConstants.segmentValue.Tipo_Comprobante
        break;
      case appConstants.segment.Vinculado:
        name = appConstants.segmentValue.Vinculado
        break;
    }
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { data: { name: name, valueId1: this.valueId1, valueId2: this.valueId2 }},
      panelClass: 'my-dialog',
      maxHeight: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.codigo) {
        this.optionAdd.emit({result: result, label: this.label})
      }
    });
  }
}
