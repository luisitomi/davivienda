import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'reporte-modulo',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'reporte-modulo',
        loadChildren: () => import('./reporte-modulo/reporte-modulo.module').then(m => m.ReporteModuloModule),
        data: { title: 'Reporte Modulo' },
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'reporte-information',
        loadChildren: () => import('./reporte-information/reporte-information.module').then(m => m.ReporteInformationModule),
        data: { title: 'Reporte Information' },
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/reporte-modulo'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
