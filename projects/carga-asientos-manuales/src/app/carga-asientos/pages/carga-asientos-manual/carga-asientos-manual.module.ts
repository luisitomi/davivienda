import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { CargaAsientosManualComponent } from './carga-asientos-manual.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { TitleHeaderModule } from '../../../shared/component/ui/title-header/title-header.module';
import { ListItemModule } from '../../../shared/component/ui/list-item/list-item.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { DirectivesModule } from '../../../shared/component/ui/directives/directives.module';
import { MatInputModule } from '@angular/material/input';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';

@NgModule({
  declarations: [
    CargaAsientosManualComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    NgxMatFileInputModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    TitleHeaderModule,
    ListItemModule,
    ActionsModule,
    LoaderModule,
  ],
  exports: [CargaAsientosManualComponent],
})
export class CargaAsientoManualModule { }
