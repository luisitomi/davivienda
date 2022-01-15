import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { TablaResumenAsientoComponent } from './tabla-resumen-asiento.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    TablaResumenAsientoComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
  ],
  exports: [TablaResumenAsientoComponent],
})
export class TablaResumenAsientoModule { }
