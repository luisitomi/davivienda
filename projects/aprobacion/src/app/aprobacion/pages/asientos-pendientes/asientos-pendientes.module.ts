import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { AsientosPendientesComponent } from './asientos-pendientes.component';
import { TablaAsientoModule } from '../../components/tabla-asientos/tabla-asientosmodule';
import { FitroPendienteModule } from '../../components/filtros-pendientes/filtros-pendientes.module';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';

@NgModule({
  declarations: [
    AsientosPendientesComponent,
  ],
  imports: [
    CommonModule,
    TablaAsientoModule,
    FitroPendienteModule,
    LoaderModule,
  ],
  exports: [AsientosPendientesComponent],
})
export class AsientosPendientesModule { }
