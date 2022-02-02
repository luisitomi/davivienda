import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { TablaAsientosComponent } from './tabla-asientos.component';
import { TitleHeaderModule } from '../../../shared/component/ui/title-header/title-header.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProgressModule } from '../../../shared/component/ui/progress/progress.module';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    TablaAsientosComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    TitleHeaderModule,
    MatCheckboxModule,
    ProgressModule,
    ActionsModule,
    MatExpansionModule,
  ],
  exports: [TablaAsientosComponent],
})
export class TablaAsientoModule { }
