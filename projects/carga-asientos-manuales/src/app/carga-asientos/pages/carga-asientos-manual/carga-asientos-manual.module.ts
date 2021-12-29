import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { CargaAsientosManualComponent } from './carga-asientos-manual.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

@NgModule({
  declarations: [
    CargaAsientosManualComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
  ],
  exports: [CargaAsientosManualComponent],
})
export class CargaAsientoManualModule { }
