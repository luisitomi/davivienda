import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsientosPendientesComponent } from './pages/asientos-pendientes/asientos-pendientes.component';

const routes: Routes = [
  {
    path: 'asientos-pendientes',
    component: AsientosPendientesComponent,
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
