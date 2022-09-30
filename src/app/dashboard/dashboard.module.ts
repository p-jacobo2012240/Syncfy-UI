import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { MetricsComponent } from './metrics/metrics.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FilterSearchingEngineComponent } from './filters-searching-engine/filter-searching-engine.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SettingOfMetricsComponent } from './setting-of-metrics/setting-of-metrics.component';

@NgModule({
  declarations: [ 
    DashboardComponent, 
    NavbarComponent, 
    MetricsComponent, 
    SidenavComponent, 
    FilterSearchingEngineComponent, 
    SettingOfMetricsComponent 
  ],
  imports: [ 
    CommonModule, 
    RouterModule, 
    MaterialModule,
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ DashboardComponent ]
})
export class DashboardModule { }
