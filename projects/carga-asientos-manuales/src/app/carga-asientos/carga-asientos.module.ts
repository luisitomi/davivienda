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
import { EditarReferenciaComponent } from './components/editar-referencia/editar-referencia.component';
import { CargaAsientosManualComponent } from './pages/carga-asientos-manual/carga-asientos-manual.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SharedModule } from '../shared';
import { CombinacionContableComponent } from './components/combinacion-contable/combinacion-contable.component';
import { cargaAsientosInterceptorProvider } from './interceptors/carga-asientos.interceptor';
import { FormularioCabeceraModule } from './components/formulario-cabecera/formulario-cabecera.module';


@NgModule({
  declarations: [
    NuevoAsientoManualComponent,
    LineasComponent,
    EditarLineaComponent,
    ReferenciasComplementariasComponent,
    EditarReferenciaComponent,
    CargaAsientosManualComponent,
    CombinacionContableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgxMatFileInputModule,
    CargaAsientosRoutingModule,
    SharedModule,
    FormularioCabeceraModule,
  ],
  providers: [
    cargaAsientosInterceptorProvider,
  ]
})
export class CargaAsientosModule { }
