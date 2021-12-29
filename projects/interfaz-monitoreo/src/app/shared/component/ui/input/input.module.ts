import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { InputComponent } from './input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    NgxMatFileInputModule,
    MatInputModule,
  ],
  exports: [InputComponent],
})
export class InputModule { }
