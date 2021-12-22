import { NgModule } from '@angular/core';
import { DecimalDirective } from './decimal.directive';
import { OnlyNumberDirective } from './only-number.directive';

@NgModule({
  exports: [OnlyNumberDirective, DecimalDirective],
  declarations: [OnlyNumberDirective, DecimalDirective],
})
export class DirectivesModule {}
