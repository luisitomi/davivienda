import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { NuevoAsientoManualComponent } from './nuevo-asiento-manual.component';
import { FormularioCabeceraModule } from '../../components/formulario-cabecera/formulario-cabecera.module';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { LineasModule } from '../../components/lineas/lineas.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    NuevoAsientoManualComponent,
  ],
  imports: [
    CommonModule,
    FormularioCabeceraModule,
    ActionsModule,
    LineasModule,
    MatCardModule,
  ],
  exports: [NuevoAsientoManualComponent],
})
export class NewManualModule { }
