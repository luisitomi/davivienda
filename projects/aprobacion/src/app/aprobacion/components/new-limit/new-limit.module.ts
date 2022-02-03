import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorsModule } from '../../../shared/component/ui/form-errors/form-errors.module';
import { InputModule } from '../../../shared/component/ui/input/input.module';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { CloseModule } from '../../../shared/component/ui/close/close.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NewLimitComponent } from './new-limit.component';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';
import { SelectModule } from '../../../shared/component/ui/select/select.module';

@NgModule({
  declarations: [
    NewLimitComponent,
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
    SelectModule,
  ],
  entryComponents: [NewLimitComponent],
})
export class NewLimitModule { }
