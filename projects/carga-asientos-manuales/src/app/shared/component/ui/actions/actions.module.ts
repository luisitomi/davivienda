import { NgModule } from '@angular/core';
import { ActionsComponent } from './actions.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ActionsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [ActionsComponent],
})
export class ActionsModule { }
