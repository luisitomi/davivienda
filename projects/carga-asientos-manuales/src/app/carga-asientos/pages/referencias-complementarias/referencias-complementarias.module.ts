import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { ReferenciasComplementariasComponent } from './referencias-complementarias.component';
import { TitleHeaderModule } from '../../../shared/component/ui/title-header/title-header.module';
import { MatCardModule } from '@angular/material/card';
import { EditarReferenceModule } from '../../components/editar-referencia/editar-referencia.module';

@NgModule({
  declarations: [
    ReferenciasComplementariasComponent,
  ],
  imports: [
    CommonModule,
    TitleHeaderModule,
    MatCardModule,
    EditarReferenceModule,
  ],
  exports: [ReferenciasComplementariasComponent],
})
export class ReferenciasComplementariasModule { }
