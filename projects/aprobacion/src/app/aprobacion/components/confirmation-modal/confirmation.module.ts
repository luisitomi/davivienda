import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { CloseModule } from '../../../shared/component/ui/close/close.module';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';

@NgModule({
  declarations: [
    ConfirmationModalComponent,
  ],
  imports: [
    CommonModule,
    CloseModule,
    MatDialogModule,
    ActionsModule,
    MatExpansionModule,
  ],
  entryComponents: [ConfirmationModalComponent],
})
export class ConfirmationModalModule { }
