import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { ListItemComponent } from './list-item.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ListItemComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatSlideToggleModule,
  ],
  exports: [ListItemComponent],
})
export class ListItemModule { }
