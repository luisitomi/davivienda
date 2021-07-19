import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoAsientoManualComponent } from './pages/nuevo-asiento-manual/nuevo-asiento-manual.component';

const routes: Routes = [
  {
    path: 'nuevo-asiento-manual',
    component: NuevoAsientoManualComponent,
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
