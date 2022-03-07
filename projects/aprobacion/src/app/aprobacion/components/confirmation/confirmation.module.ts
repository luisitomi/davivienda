import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation.component';
import { CloseModule } from '../../../shared/component/ui/close/close.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    CloseModule,
    MatDialogModule,
  ],
  entryComponents: [ConfirmationComponent],
})
export class ConfirmationModule { }
