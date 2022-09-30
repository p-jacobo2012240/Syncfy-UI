import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './dashboard/dashboard.routing';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full',
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    DashboardRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
