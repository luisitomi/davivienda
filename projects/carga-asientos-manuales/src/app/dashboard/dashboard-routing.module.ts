import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureGuard } from '../core/guards/feature.guard';
import { Features, Permissions } from '../shared';
import { CierreDiarioComponent } from './pages/cierre-diario/cierre-diario.component';
import { ControlMonitoreoComponent } from './pages/control-monitoreo/control-monitoreo.component';
import { ControlSalidaComponent } from './pages/control-salida/control-salida.component';
import { ControlSincronizacionesComponent } from './pages/control-sincronizaciones/control-sincronizaciones.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReprocesoComponent } from './pages/reproceso/reproceso.component';

const routes: Routes = [
  {
    path: 'infolet',
    component: DashboardComponent,
    data: { feature: Features.ConsultarInfolet, permission: Permissions.View },
    canActivate: [ FeatureGuard ],
  },
  {
    path: 'controlymonitoreo',
    component: ControlMonitoreoComponent,
    data: { feature: Features.ConsultarEstadoCargas, permission: Permissions.View },
    canActivate: [ FeatureGuard ],
  },
  {
    path: 'reproceso/:id/:elemento',
    component: ReprocesoComponent,
    data: { feature: Features.Reprocesar, permission: Permissions.Admin },
    canActivate: [ FeatureGuard ],
  },
  {
    path: 'cierre-diario',
    component: CierreDiarioComponent,
  },
  {
    path: 'control-salidas',
    component: ControlSalidaComponent,
  },
  {
    path: 'control-sincronizaciones',
    component: ControlSincronizacionesComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'infolet',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
