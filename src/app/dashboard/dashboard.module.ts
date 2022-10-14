import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { MetricsComponent } from './metrics/metrics.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FilterSearchingEngineComponent } from './filters-searching-engine/filter-searching-engine.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SettingOfMetricsComponent } from './setting-of-metrics/setting-of-metrics.component';
import { AlertsComponent } from './metrics/alerts/alerts.component';
import { NotificationsComponent } from './metrics/notifications/notifications.component';
import { AdmAlertsComponent } from './setting-of-metrics/adm-alerts/adm-alerts.component';
import { AdmNotificationsComponent } from './setting-of-metrics/adm-notifications/adm-notifications.component';
import { AdmFormAlertComponent } from './setting-of-metrics/adm-alerts/adm-form-alert/adm-form-alert.component';
import { AdmFormNotificationComponent } from './setting-of-metrics/adm-notifications/adm-form-notification/adm-form-notification.component';
import { AutomatedTasksComponent } from './automated-tasks/automated-tasks.component';

@NgModule({
  declarations: [ 
    DashboardComponent, 
    MetricsComponent, 
    FilterSearchingEngineComponent, 
    SettingOfMetricsComponent, 
    AlertsComponent, 
    NotificationsComponent, 
    AdmAlertsComponent, 
    AdmNotificationsComponent, 
    AdmFormAlertComponent, 
    AdmFormNotificationComponent, 
    AutomatedTasksComponent, 
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
