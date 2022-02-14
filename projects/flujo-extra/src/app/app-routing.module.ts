import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cierre-diario',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'cierre-diario',
        loadChildren: () => import('./cierre-diario-flujo/cierre-diario-flujo.module').then(m => m.CierrediarioflujonModule),
        data: { title: 'Cierre Diario' },
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/cierre-diario'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
