import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Features, Permissions } from '../shared';
import { CajaSaldosComponent } from './pages/caja-saldos/caja-saldos.component';
import { ConfiguracionCuentaComponent } from './pages/configuracion-cuenta/configuracion-cuenta.component';

const routes: Routes = [
  {
    path: 'cajaidovssaldosfah',
    component: CajaSaldosComponent,
    data: { feature: Features.ConsultarCuadreCaja, permission: Permissions.View },
  },
  {
    path: 'configuracion-cuenta',
    component: ConfiguracionCuentaComponent,
    data: { feature: Features.MantenimientoCuenta, permission: Permissions.Admin },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cajaidovssaldosfah',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuadreCajaRoutingModule { }
