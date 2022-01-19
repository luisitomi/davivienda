import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './core/pages/login/login.component';

const routes: Routes = [
  {
    path: 'authenticate',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'carga-asientos',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'carga-asientos',
        loadChildren: () => import('./carga-asientos/carga-asientos.module').then(m => m.CargaAsientosModule),
        data: { title: 'Carga Manual' },
      },
      {
        path: 'aprobacion',
        loadChildren: () => import('./aprobacion/aprobacion.module').then(m => m.AprobacionModule),
        data: { title: 'Aprobación' },
      },
      {
        path: 'interfaces-fah',
        loadChildren: () => import('./interfaces-fah/interfaces-fah.module').then(m => m.InterfacesFahModule),
        data: { title: 'Interfaces FAH' },
      },
      {
        path: 'filtros-odi',
        loadChildren: () => import('./filtros-odi/filtros-odi.module').then(m => m.FiltrosOdiModule),
        data: { title: 'Filtros ODI' },
      },
      {
        path: 'cuadre-caja',
        loadChildren: () => import('./cuadre-caja/cuadre-caja.module').then(m => m.CuadreCajaModule),
        data: { title: 'Cuadre Caja' },
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/carga-asientos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
