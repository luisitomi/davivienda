import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CierreDiarioComponent } from './pages/cierre-diario/cierre-diario.component';

const routes: Routes = [
  {
    path: 'listado',
    component: CierreDiarioComponent,
    data: {}
  },
  {
    path: '**',
    redirectTo: 'listado',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CierreDiarioFlujoRoutingModule { }
