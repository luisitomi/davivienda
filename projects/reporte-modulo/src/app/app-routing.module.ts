import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'reporte-modulo',
        loadChildren: () => import('./reporte-modulo/reporte-modulo.module').then(m => m.ReporteModuloModule),
        data: { title: 'Carga Manual' },
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
