import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { TablaInformationComponent } from './tabla-information.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ProgressModule } from '../../../shared/component/ui/progress/progress.module';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { InputModule } from '../../../shared/component/ui/input/input.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';
import { TitleHeaderModule } from '../../../shared/component/ui/title-header/title-header.module';
import { NewParameterModule } from '../../components/new-parameter/new-parameter.module';

@NgModule({
  declarations: [
    TablaInformationComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    ProgressModule,
    ActionsModule,
    InputModule,
    MatExpansionModule,
    FormsModule,
    LoaderModule,
    TitleHeaderModule,
    NewParameterModule,
  ],
  exports: [TablaInformationComponent],
})
export class TablaInformationModule { }
