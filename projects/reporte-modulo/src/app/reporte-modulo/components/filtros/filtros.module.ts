import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputModule } from '../../../shared/component/ui/input/input.module';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';
import { FiltrosComponent } from './filtros.component';
import { TitleHeaderModule } from '../../../shared/component/ui/title-header/title-header.module';
import { FormErrorsModule } from '../../../shared/component/ui/form-errors/form-errors.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from '../../../shared';

@NgModule({
  declarations: [
    FiltrosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    ActionsModule,
    LoaderModule,
    TitleHeaderModule,
    FormErrorsModule,
    MatExpansionModule,
    MatIconModule,

    MaterialModule,
    SharedModule,
  ],
  exports: [FiltrosComponent],
})
export class FitroModule { }
