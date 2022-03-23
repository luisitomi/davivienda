import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FiltroPerfilComponent } from './filtro-perfil.component';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';
import { CloseModule } from '../../../shared/component/ui/close/close.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectModule } from '../../../shared/component/ui/select/select.module';
import { FormErrorsModule } from '../../../shared/component/ui/form-errors/form-errors.module';
import { CalendarModule } from '../../../shared/component/ui/calendar/calendar.module';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { InputModule } from '../../../shared/component/ui/input/input.module';

@NgModule({
  declarations: [
    FiltroPerfilComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    CloseModule,
    MatDialogModule,
    SelectModule,
    FormErrorsModule,
    CalendarModule,
    ActionsModule,
    InputModule,
  ],
  entryComponents: [FiltroPerfilComponent],
})
export class FiltroPerfilModule { }
