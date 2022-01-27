import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaInformationComponent } from './pages/tabla-information/tabla-information.component';

const routes: Routes = [
  {
    path: 'listado',
    component: TablaInformationComponent,
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
export class ReporteModuloRoutingModule { }
