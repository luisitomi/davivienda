import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterfacesFahRoutingModule } from './interfaces-fah-routing.module';
import { ControlInterfacesComponent } from './pages/control-interfaces/control-interfaces.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TablaInterfacesComponent } from './components/tabla-interfaces/tabla-interfaces.component';
import { interfacesBackendProvider } from './interceptors/interfaces-fah.interceptor';
import { NuevaInterfazComponent } from './components/nueva-interfaz/nueva-interfaz.component';
import { MantenimientoInterfacesComponent } from './pages/mantenimiento-interfaces/mantenimiento-interfaces.component';
import { TablaMantenimientoComponent } from './components/tabla-mantenimiento/tabla-mantenimiento.component';
import { NuevoValorComponent } from './components/nuevo-valor/nuevo-valor.component';
import { MantenimientoNotificacionesComponent } from './pages/mantenimiento-notificaciones/mantenimiento-notificaciones.component';


@NgModule({
  declarations: [
    ControlInterfacesComponent,
    TablaInterfacesComponent,
    NuevaInterfazComponent,
    MantenimientoInterfacesComponent,
    TablaMantenimientoComponent,
    NuevoValorComponent,
    MantenimientoNotificacionesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InterfacesFahRoutingModule,
  ],
  providers: [
    interfacesBackendProvider,
  ]
})
export class InterfacesFahModule { }
