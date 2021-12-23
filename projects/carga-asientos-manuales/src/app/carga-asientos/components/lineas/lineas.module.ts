import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { MaterialModule } from '../../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { LineasComponent } from './lineas.component';
import { TitleHeaderModule } from '../../../shared/component/ui/title-header/title-header.module';

@NgModule({
  declarations: [
    LineasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    MaterialModule,
    TitleHeaderModule,
  ],
  exports: [LineasComponent],
})
export class LineasModule { }
