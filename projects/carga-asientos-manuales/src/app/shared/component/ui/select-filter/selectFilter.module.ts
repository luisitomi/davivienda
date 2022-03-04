import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { SelectFilterComponent } from './selectFilter.component';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatSelectSearchModule } from 'mat-select-search';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    SelectFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxMatFileInputModule,
    MatInputModule,
    MatSelectModule,
    MatSelectFilterModule,
    MatSelectSearchModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
  ],
  exports: [SelectFilterComponent],
})
export class SelectFilterModule { }
