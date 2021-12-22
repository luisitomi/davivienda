import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { TitleHeaderComponent } from './title-header.component';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TitleHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [TitleHeaderComponent],
})
export class TitleHeaderModule { }
