import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';

import { RegistroReporteComponent } from './registro-reporte.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    RegistroReporteComponent,
  ],
  imports: [
    CommonModule,
    LoaderModule,
    MatTableModule,
    ActionsModule,
    MatCardModule,
  ],
  exports: [RegistroReporteComponent],
})
export class RegistroReporteModule { }
