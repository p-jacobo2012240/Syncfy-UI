import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { MetricsComponent } from './metrics/metrics.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [ 
    DashboardComponent, 
    NavbarComponent, 
    MetricsComponent, SidenavComponent 
  ],
  imports: [ 
    CommonModule, 
    RouterModule, 
    MaterialModule,
    HighchartsChartModule
  ],
  exports: [ DashboardComponent ]
})
export class DashboardModule { }
