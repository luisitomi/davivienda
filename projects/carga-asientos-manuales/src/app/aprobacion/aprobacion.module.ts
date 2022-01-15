import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AprobacionRoutingModule } from './aprobacion-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { AsientosPendientesComponent } from './pages/asientos-pendientes/asientos-pendientes.component';
import { FiltrosPendientesComponent } from './components/filtros-pendientes/filtros-pendientes.component';
import { TablaAsientosComponent } from './components/tabla-asientos/tabla-asientos.component';
import { ResumenAsientoComponent } from './pages/resumen-asiento/resumen-asiento.component';
import { TablaResumenAsientoComponent } from './components/tabla-resumen-asiento/tabla-resumen-asiento.component';
import { ConfiguracionLimitesComponent } from './pages/configuracion-limites/configuracion-limites.component';
import { TablaLimitesComponent } from './components/tabla-limites/tabla-limites.component';
import { SharedModule } from '../shared';
import { ResumenAsientoModule } from './pages/resumen-asiento/resumen-asiento.module';


@NgModule({
  declarations: [
    AsientosPendientesComponent,
    FiltrosPendientesComponent,
    TablaAsientosComponent,
    ConfiguracionLimitesComponent,
    TablaLimitesComponent,
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
  ]
})
export class AprobacionModule { }
