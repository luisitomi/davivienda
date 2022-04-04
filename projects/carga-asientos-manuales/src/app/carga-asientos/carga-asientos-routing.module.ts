import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Features, Permissions } from '../shared';
import { CargaAsientosManualComponent } from './pages/carga-asientos-manual/carga-asientos-manual.component';
import { NuevoAsientoManualComponent } from './pages/nuevo-asiento-manual/nuevo-asiento-manual.component';
import { ReferenciasComplementariasComponent } from './pages/referencias-complementarias/referencias-complementarias.component';

const routes: Routes = [
  {
    path: 'nuevo-asiento-manual',
    component: NuevoAsientoManualComponent,
    data: { feature: Features.NuevoAsientoManual, permission: Permissions.Admin },
  },
  {
    path: 'referencias-complementarias/:index/:linea/:status',
    component: ReferenciasComplementariasComponent,
    data: { feature: Features.NuevoAsientoManual, permission: Permissions.Admin },
  },
  {
    path: 'carga-asientos-manual',
    component: CargaAsientosManualComponent,
    data: { feature: Features.CargaAsientoManual, permission: Permissions.Admin },
  },
  {
    path: '**',
    redirectTo: 'nuevo-asiento-manual',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaAsientosRoutingModule { }
