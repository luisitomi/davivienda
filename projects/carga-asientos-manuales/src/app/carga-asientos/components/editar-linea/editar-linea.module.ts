import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditarLineaComponent } from './editar-linea.component';
import { FormErrorsModule } from '../../../shared/component/ui/form-errors/form-errors.module';
import { SelectModule } from '../../../shared/component/ui/select/select.module';
import { InputModule } from '../../../shared/component/ui/input/input.module';

@NgModule({
  declarations: [
    EditarLineaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    FormErrorsModule,
    InputModule,
  ],
  entryComponents: [EditarLineaComponent],
})
export class EditarLineaModule { }
