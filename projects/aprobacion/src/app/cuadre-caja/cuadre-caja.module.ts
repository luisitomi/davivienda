import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuadreCajaRoutingModule } from './cuadre-caja-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CajaSaldosComponent } from './pages/caja-saldos/caja-saldos.component';
import { BuscarRegistrosComponent } from './components/buscar-registros/buscar-registros.component';
import { CuadreServerProvider } from './interceptors/cuadre-server.interceptor';
import { TablaRegistrosComponent } from './components/tabla-registros/tabla-registros.component';
import { ConfiguracionCuentaComponent } from './pages/configuracion-cuenta/configuracion-cuenta.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    CajaSaldosComponent,
    BuscarRegistrosComponent,
    TablaRegistrosComponent,
    ConfiguracionCuentaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CuadreCajaRoutingModule,
    SharedModule,
  ],
  providers: [
    CuadreServerProvider,
  ],
})
export class CuadreCajaModule { }
