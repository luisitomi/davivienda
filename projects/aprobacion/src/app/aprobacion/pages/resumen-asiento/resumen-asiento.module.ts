import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { ResumenAsientoComponent } from './resumen-asiento.component';
import { TablaResumenAsientoModule } from '../../components/tabla-resumen-asiento/tabla-resumen-asiento.module';
import { ListItemModule } from '../../../shared/component/ui/list-item/list-item.module';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    ResumenAsientoComponent,
  ],
  imports: [
    CommonModule,
    TablaResumenAsientoModule,
    ListItemModule,
    LoaderModule,
    ActionsModule,
    MatCardModule,
    MatListModule,
  ],
  exports: [ResumenAsientoComponent],
})
export class ResumenAsientoModule { }
