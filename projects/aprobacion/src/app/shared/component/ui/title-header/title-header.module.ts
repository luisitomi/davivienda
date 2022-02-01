import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { TitleHeaderComponent } from './title-header.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    TitleHeaderComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [TitleHeaderComponent],
})
export class TitleHeaderModule { }
