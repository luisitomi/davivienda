import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CierreDiarioComponent } from './pages/cierre-diario/cierre-diario.component';
import { ControlMonitoreoComponent } from './pages/control-monitoreo/control-monitoreo.component';
import { ControlSalidaComponent } from './pages/control-salida/control-salida.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReprocesoComponent } from './pages/reproceso/reproceso.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'controlymonitoreo',
    component: ControlMonitoreoComponent,
  },
  {
    path: 'reproceso/:id/:elemento',
    component: ReprocesoComponent,
  },
  {
    path: 'cierre-diario',
    component: CierreDiarioComponent,
  },
  {
    path: 'control-salidas',
    component: ControlSalidaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
