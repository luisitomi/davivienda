import { LOCALE_ID, NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { INTERCEPTORS } from 'src/environments/environment';
import { CargaAsientosModule } from './carga-asientos/carga-asientos.module';
import { AprobacionModule } from './aprobacion/aprobacion.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    DashboardModule,
    BrowserAnimationsModule,
    CargaAsientosModule,
    AprobacionModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    INTERCEPTORS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
