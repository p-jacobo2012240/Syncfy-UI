import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LoginComponent ],
  imports: [
    CommonModule,
    DashboardModule,
    MaterialModule
  ],
  exports: [ LoginComponent ]

})
export class AuthModule { }
