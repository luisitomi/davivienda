import { NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CombinacionContableComponent } from './combinacion-contable.component';
import { SelectModule } from '../../../shared/component/ui/select/select.module';
import { CloseModule } from '../../../shared/component/ui/close/close.module';
import { FormErrorsModule } from '../../../shared/component/ui/form-errors/form-errors.module';
import { ActionsModule } from '../../../shared/component/ui/actions/actions.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderModule } from '../../../shared/component/ui/loader/loader.module';

@NgModule({
  declarations: [
    CombinacionContableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    CloseModule,
    FormErrorsModule,
    ActionsModule,
    MatDialogModule,
    LoaderModule,
  ],
  entryComponents: [CombinacionContableComponent],
})
export class CmbinacionContableModule { }
