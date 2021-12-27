import { NgModule } from '@angular/core';
import { ActionsComponent } from './actions.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ActionsComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [ActionsComponent],
})
export class ActionsModule { }
