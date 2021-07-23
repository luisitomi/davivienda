import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsientosPendientesComponent } from './pages/asientos-pendientes/asientos-pendientes.component';
import { ResumenAsientoComponent } from './pages/resumen-asiento/resumen-asiento.component';

const routes: Routes = [
  {
    path: 'asientos-pendientes',
    component: AsientosPendientesComponent,
  },
  {
    path: 'resumen-asiento/:id',
    component: ResumenAsientoComponent,
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
