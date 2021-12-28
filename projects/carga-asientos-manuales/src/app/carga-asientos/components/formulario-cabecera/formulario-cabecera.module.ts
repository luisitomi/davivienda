import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { MaterialModule } from '../../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { FormularioCabeceraComponent } from './formulario-cabecera.component';
import { TitleHeaderModule } from '../../../shared/component/ui/title-header/title-header.module';
import { InputModule } from '../../../shared/component/ui/input/input.module';
import { FormErrorsModule } from '../../../shared/component/ui/form-errors/form-errors.module';
import { SelectModule } from '../../../shared/component/ui/select/select.module';
import { MatCardModule } from '@angular/material/card';
import { CalendarModule } from '../../../shared/component/ui/calendar/calendar.module';

@NgModule({
  declarations: [
    FormularioCabeceraComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    TitleHeaderModule,
    InputModule,
    FormErrorsModule,
    SelectModule,
    MatCardModule,
    CalendarModule,
  ],
  exports: [FormularioCabeceraComponent],
})
export class FormularioCabeceraModule { }
