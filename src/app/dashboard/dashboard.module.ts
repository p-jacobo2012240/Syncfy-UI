import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ 
    DashboardComponent, 
    NavbarComponent 
  ],
  imports: [ 
    CommonModule, 
    RouterModule, 
    MaterialModule 
  ],
  exports: [ DashboardComponent ]
})
export class DashboardModule { }
