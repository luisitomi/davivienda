import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [
    LayoutComponent
  ]
})
export class CoreModule { }
