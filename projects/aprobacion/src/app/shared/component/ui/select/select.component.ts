import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { coerceBooleanProp } from '../../helpers/boolean.helper';
import { DropdownItem, EventDropdown } from './select.model';

type DropdownItemType = string | number | DropdownItem | any;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent ), multi: true }],
})
export class SelectComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Output() changeOption: EventEmitter<EventDropdown> = new EventEmitter<EventDropdown>();
  @ViewChild(MatSelect, { static: true }) dropdown: MatSelect;

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

  protected inputOptions: Array<DropdownItem>;

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
}
