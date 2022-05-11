import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';
import { CloseModule } from '../../../shared/component/ui/close/close.module';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { InputModule } from '../../../shared/component/ui/input/input.module';
import { FormErrorsModule } from '../../../shared/component/ui/form-errors/form-errors.module';


@NgModule({
  declarations: [
    ModalComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    LoaderModule,
    CloseModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    ActionsModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
  ],
  entryComponents: [ModalComponent],
})
export class ModalModule { }
