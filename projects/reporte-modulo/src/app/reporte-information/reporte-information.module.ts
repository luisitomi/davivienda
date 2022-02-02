import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SharedModule } from '../shared';
import { TablaInformationModule } from './pages/tabla-information/tabla-information.module';
import { ReporteInformationRoutingModule } from './reporte-information-routing.module';
import { RegistroModuloReporteModule } from './pages/registro-modulo-reporte/registro-modulo-reporte.module';
import { InputModule } from 'projects/carga-asientos-manuales/src/app/shared/component/ui/input/input.module';

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
    RegistroModuloReporteModule,
  ],
})
export class ReporteInformationModule { }
