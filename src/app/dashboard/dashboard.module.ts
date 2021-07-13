import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MaterialModule } from '../shared/material.module';
import { InfoletOrigenComponent } from './components/infolet-origen/infolet-origen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoletGlobalComponent } from './components/infolet-global/infolet-global.component';
import { FiltrosCargaComponent } from './components/filtros-carga/filtros-carga.component';
import { ControlMonitoreoComponent } from './pages/control-monitoreo/control-monitoreo.component';
import { TablaControlComponent } from './components/tabla-control/tabla-control.component';
import { DetalleArchivoComponent } from './components/detalle-archivo/detalle-archivo.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InfoletOrigenComponent,
    InfoletGlobalComponent,
    FiltrosCargaComponent,
    ControlMonitoreoComponent,
    TablaControlComponent,
    DetalleArchivoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MaterialModule,
  ]
})
export class DashboardModule { }
