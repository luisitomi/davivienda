import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AprobacionRoutingModule } from './aprobacion-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { AsientosPendientesComponent } from './pages/asientos-pendientes/asientos-pendientes.component';
import { FiltrosPendientesComponent } from './components/filtros-pendientes/filtros-pendientes.component';
import { SharedModule } from '../shared';
import { ResumenAsientoModule } from './pages/resumen-asiento/resumen-asiento.module';
import { TablaAsientoModule } from './components/tabla-asientos/tabla-asientosmodule';
import { ConfiguracionLimitesModule } from './pages/configuracion-limites/configuracion-limites.module';
import { EnvironmentServiceProvider } from '../core/interceptors/dev-backend.interceptor';


@NgModule({
  declarations: [
    AsientosPendientesComponent,
    FiltrosPendientesComponent,
  ],
  imports: [
    CommonModule,
    AprobacionRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    ResumenAsientoModule,
    TablaAsientoModule,
    ConfiguracionLimitesModule,
  ],
  providers: [
    EnvironmentServiceProvider,
  ]
})
export class AprobacionModule { }
