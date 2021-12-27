import { NgModule } from '@angular/core';
import { ActionsComponent } from './actions.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ActionsComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [ActionsComponent],
})
export class ActionsModule { }
