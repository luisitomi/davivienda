import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { LineasComponent } from './lineas.component';
import { TitleHeaderModule } from '../../../shared/component/ui/title-header/title-header.module';
import { InputModule } from '../../../shared/component/ui/input/input.module';
import { EditarLineaModule } from '../editar-linea/editar-linea.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { CmbinacionContableModule } from '../combinacion-contable/combinacion-contable.module';
import { EditarValueModule } from '../editar-value/editar-value.module';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';

@NgModule({
  declarations: [
    LineasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    MatCardModule,
    TitleHeaderModule,
    InputModule,
    EditarLineaModule,
    MatTableModule,
    ActionsModule,
    CmbinacionContableModule,
    EditarValueModule,
    LoaderModule,
  ],
  exports: [LineasComponent],
})
export class LineasModule { }
