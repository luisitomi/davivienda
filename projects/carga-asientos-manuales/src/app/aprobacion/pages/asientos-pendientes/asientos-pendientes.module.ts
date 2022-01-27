import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsientosPendientesComponent } from './asientos-pendientes.component';
import { TablaAsientoModule } from '../../components/tabla-asientos/tabla-asientosmodule';
import { FiltrosPendientesComponent } from '../../components/filtros-pendientes/filtros-pendientes.component';
import { MaterialModule } from '../../../shared/material.module';

@NgModule({
  declarations: [
    AsientosPendientesComponent,
    FiltrosPendientesComponent//eliminar luego
  ],
  imports: [
    CommonModule,
    TablaAsientoModule,
    FormsModule,//Eliminar luego
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [AsientosPendientesComponent],
})
export class AsientosPendientesModule { }
