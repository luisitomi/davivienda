import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { SelectComponent } from './select.component';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxMatFileInputModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [SelectComponent],
})
export class SelectModule { }
