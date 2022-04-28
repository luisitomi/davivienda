import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorsModule } from '../../../shared/component/ui/form-errors/form-errors.module';
import { InputModule } from '../../../shared/component/ui/input/input.module';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { CloseModule } from '../../../shared/component/ui/close/close.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NewParameterComponent } from './new-parameter.component';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';
import { MatTableModule } from '@angular/material/table';
import { SelectModule } from '../../../shared/component/ui/select/select.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CalendarModule } from '../../../shared/component/ui/calendar/calendar.module';

@NgModule({
  declarations: [
    NewParameterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
    InputModule,
    ActionsModule,
    CloseModule,
    MatDialogModule,
    LoaderModule,
    MatTableModule,
    SelectModule, 
    MatInputModule,
    MatButtonModule,
    CalendarModule,
  ],
  entryComponents: [NewParameterComponent],
})
export class NewParameterModule { }
