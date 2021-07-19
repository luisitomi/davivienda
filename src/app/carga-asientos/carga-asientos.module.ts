import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargaAsientosRoutingModule } from './carga-asientos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CargaAsientosRoutingModule,
  ]
})
export class CargaAsientosModule { }
