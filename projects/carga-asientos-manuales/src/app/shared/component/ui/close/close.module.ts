import { NgModule } from '@angular/core';
import { CloseComponent } from './close.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CloseComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [CloseComponent],
})
export class CloseModule { }
