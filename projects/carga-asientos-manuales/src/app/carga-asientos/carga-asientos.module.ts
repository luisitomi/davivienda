import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargaAsientosRoutingModule } from './carga-asientos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CargaAsientosManualComponent } from './pages/carga-asientos-manual/carga-asientos-manual.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SharedModule } from '../shared';
import { CombinacionContableComponent } from './components/combinacion-contable/combinacion-contable.component';
import { cargaAsientosInterceptorProvider } from './interceptors/carga-asientos.interceptor';
import { NewManualModule } from './pages/nuevo-asiento-manual/nuevo-asiento-manual.module';
import { ReferenciasComplementariasModule } from './pages/referencias-complementarias/referencias-complementarias.module';

@NgModule({
  declarations: [
    CargaAsientosManualComponent,
    CombinacionContableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgxMatFileInputModule,
    CargaAsientosRoutingModule,
    SharedModule,
    NewManualModule,
    ReferenciasComplementariasModule,
  ],
  providers: [
    cargaAsientosInterceptorProvider,
  ]
})
export class CargaAsientosModule { }
