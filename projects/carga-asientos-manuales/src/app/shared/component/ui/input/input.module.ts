import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { InputComponent } from './inputcomponent';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    NgxMatFileInputModule,
    MaterialModule,
  ],
  exports: [InputComponent],
})
export class InputModule { }
