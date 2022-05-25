import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { CargaAsientosManualComponent } from './carga-asientos-manual.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleHeaderModule } from '../../../shared/component/ui/title-header/title-header.module';
import { ListItemModule } from '../../../shared/component/ui/list-item/list-item.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { DirectivesModule } from '../../../shared/component/ui/directives/directives.module';
import { MatInputModule } from '@angular/material/input';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
  declarations: [
    CargaAsientosManualComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule ,
    TitleHeaderModule,
    ListItemModule,
    ActionsModule,
    LoaderModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [CargaAsientosManualComponent],
})
export class CargaAsientoManualModule { }
