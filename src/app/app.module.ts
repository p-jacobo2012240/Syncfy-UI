import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module'; 
import { DashboardModule } from './dashboard/dashboard.module'; 
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

// Import the module from the SDK
import { OAuthModule } from "angular-oauth2-oidc";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    AuthModule,
    DashboardModule, 
    RouterModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [ environment.keycloack.allowedUrl ],
        sendAccessToken: true
      }
    }),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
