import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SharedModule } from '../shared';
import { TablaInformationModule } from './pages/tabla-information/tabla-information.module';
import { ReporteModuloRoutingModule } from './reporte-modulo-routing.module';
import { TablaEjecucionModule } from './pages/tabla-ejecucion/tabla-ejecuion.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMatFileInputModule,
    SharedModule,
    TablaInformationModule,
    ReporteModuloRoutingModule,
    TablaEjecucionModule,
  ],
})
export class ReporteModuloModule { }
