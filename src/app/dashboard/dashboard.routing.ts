import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SettingOfMetricsComponent } from './setting-of-metrics/setting-of-metrics.component';

import { MetricsComponent } from './metrics/metrics.component';
import { AdmAlertsComponent } from './setting-of-metrics/adm-alerts/adm-alerts.component';
import { AdmNotificationsComponent } from './setting-of-metrics/adm-notifications/adm-notifications.component';
import { AutomatedTasksComponent } from './automated-tasks/automated-tasks.component';
import { AtTypesComponent } from './automated-tasks/at-types/at-types.component';
import { AuthGuard } from '../core/auth.guard';

const dashboardRoutes: Routes = [
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: MetricsComponent
            },
            {
                path: 'automated-tasks/:type',
                component: AutomatedTasksComponent,
                children: [
                    {
                        path: '',
                        component: AtTypesComponent
                    }
                ]
            },
            { 
                path: 'metrics-settings/:type', 
                component: SettingOfMetricsComponent,
                children: [
                    { 
                        path: 'alerts', 
                        component: AdmAlertsComponent  
                    },
                    {
                        path: 'notifications', 
                        component: AdmNotificationsComponent  
                    }
                ]
            }
        ],
        canActivate: [ AuthGuard ]
    },
];

@NgModule({
    imports: [
      RouterModule.forChild(dashboardRoutes)
    ],
    exports: [ RouterModule ]
})
export class DashboardRoutingModule { }
  