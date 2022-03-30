import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SharedModule } from '../shared';
import { CierreDiarioModule } from './pages/cierre-diario/cierre-diario.module';
import { CierreDiarioFlujoRoutingModule } from './cierre-diario-flujo-routing.module';
import { ConfirmationModule } from './components/confirmation/confirmation.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMatFileInputModule,
    SharedModule,
    CierreDiarioModule,
    CierreDiarioFlujoRoutingModule,
    ConfirmationModule,
  ],
})
export class CierrediarioflujonModule { }
