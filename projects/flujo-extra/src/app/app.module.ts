import { LOCALE_ID, NgModule } from '@angular/core';
import '@angular/common/locales/global/es-CO';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageErrorInterceptor } from './shared/interceptor/message-error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { EnvironmentServiceProvider } from './core/interceptors/dev-backend.interceptor';
import { CierrediarioflujonModule } from './cierre-diario-flujo/cierre-diario-flujo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    CierrediarioflujonModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000, horizontalPosition: 'end', verticalPosition: 'bottom' } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MessageErrorInterceptor,
      multi: true,
    },
    EnvironmentServiceProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
