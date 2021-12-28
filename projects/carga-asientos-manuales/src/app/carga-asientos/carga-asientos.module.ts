import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargaAsientosRoutingModule } from './carga-asientos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CargaAsientosManualComponent } from './pages/carga-asientos-manual/carga-asientos-manual.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SharedModule } from '../shared';
import { cargaAsientosInterceptorProvider } from './interceptors/carga-asientos.interceptor';
import { NewManualModule } from './pages/nuevo-asiento-manual/nuevo-asiento-manual.module';
import { ReferenciasComplementariasModule } from './pages/referencias-complementarias/referencias-complementarias.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    CargaAsientosManualComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMatFileInputModule,
    CargaAsientosRoutingModule,
    SharedModule,
    NewManualModule,
    ReferenciasComplementariasModule,
    MaterialModule
  ],
  providers: [
    cargaAsientosInterceptorProvider,
  ]
})
export class CargaAsientosModule { }
