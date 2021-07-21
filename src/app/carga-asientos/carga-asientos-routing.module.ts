import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargaAsientosManualComponent } from './pages/carga-asientos-manual/carga-asientos-manual.component';
import { NuevoAsientoManualComponent } from './pages/nuevo-asiento-manual/nuevo-asiento-manual.component';
import { ReferenciasComplementariasComponent } from './pages/referencias-complementarias/referencias-complementarias.component';

const routes: Routes = [
  {
    path: 'nuevo-asiento-manual',
    component: NuevoAsientoManualComponent,
  },
  {
    path: 'referencias-complementarias/:linea',
    component: ReferenciasComplementariasComponent,
  },
  {
    path: 'carga-asientos-manual',
    component: CargaAsientosManualComponent,
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
