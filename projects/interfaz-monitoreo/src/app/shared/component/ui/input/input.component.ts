import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProp } from '../../helpers/boolean.helper';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }],
})
export class InputComponent implements OnChanges {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() maxlength: string;
  @Input() decimal: boolean;
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
