import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AprobacionRoutingModule } from './aprobacion-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { AsientosPendientesComponent } from './pages/asientos-pendientes/asientos-pendientes.component';


@NgModule({
  declarations: [
    AsientosPendientesComponent
  ],
  imports: [
    CommonModule,
    AprobacionRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class AprobacionModule { }
