import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProp } from '../../helpers/boolean.helper';
import { CalendarItem } from './calendar.model';

export type CalendarValueType = string | Date | Array<Date>;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CalendarComponent), multi: true }],
})
export class CalendarComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() maxDate: Date;
  @Input() minDate: Date;
  @Input() selectionMode = 'single';
  @Output() changeCalendarOption: EventEmitter<CalendarItem> = new EventEmitter<CalendarItem>();

  @Input()
  get value(): CalendarValueType {
    return this.inputValue;
  }
  set value(value: CalendarValueType) {
    this.inputValue = value;
    if (!this.disabled) {
      this.propagateChange(this.value);
    }
  }

  protected inputValue: CalendarValueType;

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

  isRange(): boolean {
    return this.selectionMode === 'range';
  }

  propagateChange: any = () => {
    // propagate
  };

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

  onDateChange(event: any): void {
    this.changeCalendarOption.emit({
      value: event?.value,
    });
  }
}
