import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
})
export class FormErrorsComponent {
  @Input() messageCustom: string;
  @Input() public control: AbstractControlDirective | AbstractControl;

  readonly errorMessages: any = {
    required: (): string => 'Este campo es obligatorio',
    invalidNumber: (): string => 'Solo se admiten números',
    invalidDecimal: (): string => 'Solo se admiten números con decimales',
    pattern: (): string => 'No cumple con el formato correcto',
  };

  shouldShowErrors() {
    return (
      (this.control && this.control.errors && (this.control.dirty || this.control.touched)) ||
      (this.control && this.control.invalid && !!this.control.value)
    );
  }

  listOfErrors() {
    let errors: Array<string> = [];
    if (this.control.errors) {
      errors = Object.keys(this.control.errors).map((field: any) => this.getMessage(field, this.control.errors![field]));
    }

    return errors;
  }

  trackByFn(index: any, item: any): any {
    return index;
  }

  protected getMessage(type: string, params: any): string {
    return this.errorMessages[type](params);
  }
}
