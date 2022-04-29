import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { InputCurrencyComponent } from './input-currency.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatInputModule } from '@angular/material/input';
import { NgNumberInputModule } from 'ng-number-input';

@NgModule({
  declarations: [
    InputCurrencyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgNumberInputModule,
    DirectivesModule,
    NgxMatFileInputModule,
    MatInputModule,
  ],
  exports: [InputCurrencyComponent],
})
export class InputCurrencyModule { }
