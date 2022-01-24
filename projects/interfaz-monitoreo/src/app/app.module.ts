import { LOCALE_ID, NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { INTERCEPTORS } from 'src/environments/environment';

import { CuadreCajaModule } from './cuadre-caja/cuadre-caja.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { tokenInterceptorProvider } from './core/interceptors/token.interceptor';
import { EnvironmentServiceProvider } from './core/interceptors/dev-backend.interceptor';

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
    CuadreCajaModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000, horizontalPosition: 'end', verticalPosition: 'bottom' } },
    //tokenInterceptorProvider,
    //INTERCEPTORS,
    EnvironmentServiceProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
