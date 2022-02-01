import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressComponent } from './progress.component';

@NgModule({
  declarations: [
    ProgressComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatSlideToggleModule,
  ],
  exports: [ProgressComponent],
})
export class ProgressModule { }
