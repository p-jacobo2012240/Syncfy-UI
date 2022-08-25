import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the module from the SDK
import { AuthModule as Auth0 } from '@auth0/auth0-angular';
import { environment } from '../../environments/environment';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    Auth0.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId
    }),
    CommonModule
  ]
})
export class AuthModule { }
