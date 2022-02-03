import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureGuard } from '../core/guards/feature.guard';
import { RegistroModuloReporteComponent } from './pages/registro-modulo-reporte/registro-modulo-reporte.component';
import { TablaInformationComponent } from './pages/tabla-information/tabla-information.component';

const routes: Routes = [
  {
    path: 'listado',
    component: TablaInformationComponent,
 //   canActivate: [ FeatureGuard  ],
    data: {}
  },
  {
    path: 'registro/:id',
    component: RegistroModuloReporteComponent,
  //  canActivate: [ FeatureGuard  ],
    data: {}
  },
  {
    path: 'registro',
    component: RegistroModuloReporteComponent,
  //  canActivate: [ FeatureGuard  ],
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
export class ReporteInformationRoutingModule { }
