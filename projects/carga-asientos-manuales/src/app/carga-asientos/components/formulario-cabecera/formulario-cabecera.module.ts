import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { MaterialModule } from '../../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { FormularioCabeceraComponent } from './formulario-cabecera.component';
import { TitleHeaderModule } from '../../../shared/component/ui/title-header.module';

@NgModule({
  declarations: [
    FormularioCabeceraComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    MaterialModule,
    TitleHeaderModule,
  ],
  exports: [FormularioCabeceraComponent],
})
export class FormularioCabeceraModule { }
