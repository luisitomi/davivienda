import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargaAsientosRoutingModule } from './carga-asientos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { NuevoAsientoManualComponent } from './pages/nuevo-asiento-manual/nuevo-asiento-manual.component';
import { FormularioCabeceraComponent } from './components/formulario-cabecera/formulario-cabecera.component';
import { LineasComponent } from './components/lineas/lineas.component';
import { HttpClientModule } from '@angular/common/http';
import { EditarLineaComponent } from './components/editar-linea/editar-linea.component';
import { ReferenciasComplementariasComponent } from './pages/referencias-complementarias/referencias-complementarias.component';


@NgModule({
  declarations: [
    NuevoAsientoManualComponent,
    FormularioCabeceraComponent,
    LineasComponent,
    EditarLineaComponent,
    ReferenciasComplementariasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    CargaAsientosRoutingModule,
  ]
})
export class CargaAsientosModule { }
