import { Component, forwardRef, Input, OnChanges, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProp } from '../../helpers/boolean.helper';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(1000)]),
      transition(':leave', animate(0, style({ opacity: 0 }))),
    ]),
  ],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputCurrencyComponent), multi: true }],
})
export class InputCurrencyComponent implements OnChanges {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() valueInput: string;
  @Input() maxlength: number;
  @Input() decimal: boolean;
  @Input() style: boolean;
  @Input() limitTo: number;
  @ViewChild('validators') validators: any;
  customStyle = { textAlign: 'right' };
  customStyle1 = { textAlign: 'left' };
  @Input()
  get onlyNumber(): boolean {
    return this.inputOnlyNumber;
  }
  set onlyNumber(value: boolean) {
    this.inputOnlyNumber = coerceBooleanProp(value);
  }

  protected inputOnlyNumber = false;

  @Input()
  get value(): string {
    return this.inputValue;
  }
  set value(value: string) {
    this.inputValue = value;
    if (!this.disabled) {
      this.propagateChange(this.value);
    }
  }

  protected inputValue: string;

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
  get type(): string {
    return this.inputType;
  }
  set type(value: string) {
    this.inputType = value;
  }

  protected inputType = 'text';

  propagateChange: any = () => {
    // propagate
  };

  ngOnChanges(): void {
    if (!this.disabled) {
      this.propagateChange(this.value);
    }
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerOnTouched(fn: any): void {
    // register
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
