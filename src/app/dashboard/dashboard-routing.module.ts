import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlMonitoreoComponent } from './pages/control-monitoreo/control-monitoreo.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
