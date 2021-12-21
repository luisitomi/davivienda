import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltrosOdiRoutingModule } from './filtros-odi-routing.module';
import { MantenimientoFiltrosComponent } from './pages/mantenimiento-filtros/mantenimiento-filtros.component';
import { BuscarFiltrosComponent } from './components/buscar-filtros/buscar-filtros.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { filtroServerProvider } from './interceptors/filtros-server.interceptor';
import { TablaFiltrosComponent } from './components/tabla-filtros/tabla-filtros.component';
import { NuevoFiltroComponent } from './components/nuevo-filtro/nuevo-filtro.component';
import { CargaFiltrosComponent } from './components/carga-filtros/carga-filtros.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    MantenimientoFiltrosComponent,
    BuscarFiltrosComponent,
    TablaFiltrosComponent,
    NuevoFiltroComponent,
    CargaFiltrosComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FiltrosOdiRoutingModule,
    NgxMatFileInputModule,
    SharedModule,
  ],
  providers: [
    filtroServerProvider,
  ],
})
export class FiltrosOdiModule { }
