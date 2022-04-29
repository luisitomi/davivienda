import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { CommonModule } from '@angular/common';
import { ConfiguracionLimitesComponent } from './configuracion-limites.component';
import { TablaLimitesModule } from '../../components/tabla-limites/tabla-limites.module';
import { TitleHeaderModule } from '../../../shared/component/ui/title-header/title-header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { InputModule } from '../../../shared/component/ui/input/input.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { SelectModule } from '../../../shared/component/ui/select/select.module';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';
import { InputCurrencyModule } from '../../../shared/component/ui/input-currency/input-currency.module';

@NgModule({
  declarations: [
    ConfiguracionLimitesComponent,
  ],
  imports: [
    CommonModule,
    TablaLimitesModule,
    TitleHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    InputModule,
    MatExpansionModule,
    ActionsModule,
    SelectModule,
    LoaderModule,
    InputCurrencyModule,
  ],
  exports: [ConfiguracionLimitesComponent],
})
export class ConfiguracionLimitesModule { }
