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
import { CalendarModule } from '../../../shared/component/ui/calendar/calendar.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { InformacionAdicionalReporteModule } from '../Informacion-adicional-reporte/informacion-adicional-reporte.module';
import { ModalRegistroLovModule } from '../modal-registro-lov/modal-registro-lov.module';
import { ProgressModule } from '../../../shared/component/ui/progress/progress.module';

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
    CalendarModule,
    MatTabsModule,
    MatTableModule,
    InformacionAdicionalReporteModule,
    ModalRegistroLovModule,
    ProgressModule
  ],
  exports: [RegistroReporteComponent],
})
export class RegistroReporteModule { }