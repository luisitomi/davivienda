import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderModule } from '../../loader/loader.module';
import { CloseModule } from '../../close/close.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActionsModule } from '../../actions/actions.module';

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
  ],
  entryComponents: [ModalComponent],
})
export class ModalModule { }
