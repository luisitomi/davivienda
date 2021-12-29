import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[decimal]',
})
export class DecimalDirective {
  @Input() decimal: boolean;

  private readonly regex: RegExp = new RegExp(/^[0-9]*([,.][0-9]*)?$/g);
  private readonly specialKeys: Array<string> = ['Backspace', 'tab', 'End', 'Home'];

  constructor(private readonly el: ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): any {
    if (this.decimal) {
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      if (this.el) {
        const current = this.el.nativeElement.value || '';
        const next = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
          event.preventDefault();
        }
      }
    }
  }
}
