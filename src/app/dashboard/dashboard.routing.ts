import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SettingOfMetricsComponent } from './setting-of-metrics/setting-of-metrics.component';

// Import the authentication guard
import { AuthGuard } from '@auth0/auth0-angular';

const dashboardRoutes: Routes = [
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        children: [
            { 
                path: 'metrics-settings', 
                component: SettingOfMetricsComponent  
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
  