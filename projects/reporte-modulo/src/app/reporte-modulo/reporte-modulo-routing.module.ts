import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureGuard } from '../core/guards/feature.guard';
import { TablaEjecucionComponent } from './pages/tabla-ejecucion/tabla-ejecucion.component';
import { TablaInformationComponent } from './pages/tabla-information/tabla-information.component';

const routes: Routes = [
  {
    path: 'listado',
    component: TablaInformationComponent,
   // canActivate: [ FeatureGuard  ],
    data: {}
  },
  {
    path: 'listado-ejecucion',
    component: TablaEjecucionComponent,
   // canActivate: [ FeatureGuard  ],
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
