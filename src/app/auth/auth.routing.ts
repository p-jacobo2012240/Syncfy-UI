import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginCallbackComponent } from './login-callback/login-callback.component';

const authRoutes: Routes = [
    {
        path: 'authentication',
        component: LoginComponent
    },
    {
        path: 'login-callback',
        component: LoginCallbackComponent
    }
];

@NgModule({
    imports: [
      RouterModule.forChild(authRoutes)
    ],
    exports: [ RouterModule ]
})
export class AuthRoutingModule { }
  