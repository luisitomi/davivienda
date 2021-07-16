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
import { ReprocesoComponent } from './pages/reproceso/reproceso.component';
import { CorreccionDatosComponent } from './components/correccion-datos/correccion-datos.component';
import { EditarFiltroComponent } from './components/editar-filtro/editar-filtro.component';
import { EditarColumnaComponent } from './components/editar-columna/editar-columna.component';
import { CierreDiarioComponent } from './pages/cierre-diario/cierre-diario.component';
import { ControlSalidaComponent } from './pages/control-salida/control-salida.component';
import { FiltrosSalidaComponent } from './components/filtros-salida/filtros-salida.component';
import { TablaSalidasComponent } from './components/tabla-salidas/tabla-salidas.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InfoletOrigenComponent,
    InfoletGlobalComponent,
    FiltrosCargaComponent,
    ControlMonitoreoComponent,
    TablaControlComponent,
    DetalleArchivoComponent,
    ReprocesoComponent,
    CorreccionDatosComponent,
    EditarFiltroComponent,
    EditarColumnaComponent,
    CierreDiarioComponent,
    ControlSalidaComponent,
    FiltrosSalidaComponent,
    TablaSalidasComponent,
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
