import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputModule } from '../../../shared/component/ui/input/input.module';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';

import { TitleHeaderModule } from '../../../shared/component/ui/title-header/title-header.module';
import { FormErrorsModule } from '../../../shared/component/ui/form-errors/form-errors.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RegistroReporteComponent } from './registro-reporte.component';
import { MatCardModule } from '@angular/material/card';
import { SelectModule } from '../../../shared/component/ui/select/select.module';

@NgModule({
  declarations: [
    RegistroReporteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    ActionsModule,
    LoaderModule,
    TitleHeaderModule,
    FormErrorsModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    SelectModule,
  ],
  entryComponents: [RegistroReporteComponent],
})
export class RegistroReporteModule { }
