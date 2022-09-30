import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const authRoutes: Routes = [
    {
        path: 'authentication',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
      RouterModule.forChild(authRoutes)
    ],
    exports: [ RouterModule ]
})
export class AuthRoutingModule { }
  