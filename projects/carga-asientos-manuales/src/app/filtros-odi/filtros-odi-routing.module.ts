import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Features, Permissions } from '../shared';
import { MantenimientoFiltrosComponent } from './pages/mantenimiento-filtros/mantenimiento-filtros.component';

const routes: Routes = [
  {
    path: 'mantenimiento-filtros',
    component: MantenimientoFiltrosComponent,
    data: { feature: Features.FiltrosODI, permission: Permissions.Admin },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiltrosOdiRoutingModule { }
