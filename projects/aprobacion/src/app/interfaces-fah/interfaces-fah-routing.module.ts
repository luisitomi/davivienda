import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlInterfacesComponent } from './pages/control-interfaces/control-interfaces.component';
import { MantenimientoInterfacesComponent } from './pages/mantenimiento-interfaces/mantenimiento-interfaces.component';
import { MantenimientoNotificacionesComponent } from './pages/mantenimiento-notificaciones/mantenimiento-notificaciones.component';

const routes: Routes = [
  {
    path: 'control-interfaces',
    component: ControlInterfacesComponent,
  },
  {
    path: 'mantenimiento',
    component: MantenimientoInterfacesComponent,
  },
  {
    path: 'notificaciones',
    component: MantenimientoNotificacionesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterfacesFahRoutingModule { }
