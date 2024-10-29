import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MaterialModule } from '../material/material.module';
import { LoginCallbackComponent } from './login-callback/login-callback.component';

@NgModule({
  declarations: [
    LoginComponent, 
    LoginCallbackComponent 
  ],
  imports: [
    CommonModule,
    DashboardModule,
    MaterialModule
  ],
  exports: [ LoginComponent ]

})
export class AuthModule { }
