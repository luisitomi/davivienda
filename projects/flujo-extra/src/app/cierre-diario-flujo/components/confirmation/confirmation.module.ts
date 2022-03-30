import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation.component';
import { CloseModule } from '../../../shared/component/ui/close/close.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    CloseModule,
    MatDialogModule,
    ActionsModule,
    MatExpansionModule,
  ],
  entryComponents: [ConfirmationComponent],
})
export class ConfirmationModule { }
