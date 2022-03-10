import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Features, Permissions } from '../shared';
import { AsientosPendientesComponent } from './pages/asientos-pendientes/asientos-pendientes.component';
import { ConfiguracionLimitesComponent } from './pages/configuracion-limites/configuracion-limites.component';
import { ResumenAsientoComponent } from './pages/resumen-asiento/resumen-asiento.component';

const routes: Routes = [
  {
    path: 'asientos-pendientes',
    component: AsientosPendientesComponent,
    data: { feature: Features.AprobacionCargas, permission: Permissions.Admin },
  },
  {
    path: 'resumen-asiento/:id/:cuenta',
    component: ResumenAsientoComponent,
    data: { feature: Features.AprobacionCargas, permission: Permissions.Admin },
  },
  {
    path: 'configuracion-limites',
    component: ConfiguracionLimitesComponent,
    data: { feature: Features.AprobacionCargas, permission: Permissions.Admin },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'asientos-pendientes',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprobacionRoutingModule { }
