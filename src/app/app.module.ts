import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module'; 
import { DashboardModule } from './dashboard/dashboard.module'; 
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

// Import the module from the SDK
import { AuthModule as Auth0 } from '@auth0/auth0-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AuthModule,
    DashboardModule, 
    RouterModule,
    Auth0.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId
    }),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
