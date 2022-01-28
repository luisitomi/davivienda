import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SharedModule } from '../shared';
import { TablaInformationModule } from './pages/tabla-information/tabla-information.module';
import { ReporteInformationRoutingModule } from './reporte-information-routing.module';

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
    ReporteInformationRoutingModule,
  ],
})
export class ReporteInformationModule { }
