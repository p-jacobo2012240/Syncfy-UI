/**
 * The purpose of a login callback component is to handle the OAuth2 authorization callback—the redirect 
 * back to your application after a successful login with the OAuth provider. Here’s why it’s useful in this context
 * 
 * Configure a auth.config.ts = directUri: window.location.origin + '/login-callback',
 * 
 * Why Use loadDiscoveryDocumentAndTryLogin(): This method is essential for processing the callback from the identity provider. 
 * It checks for an authorization code or token in the URL, validates it, and exchanges it for tokens as necessary.
 * 
 * Redirecting within the Callback Component: The callback component can direct the user to another 
 * route (e.g., /dashboard) once the login process completes, ensuring a smooth user experience. 
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login-callback',
  template: '<p>Logging in...</p>'
})
export class LoginCallbackComponent implements OnInit {

  constructor(
    private oAuthService: OAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(loggedIn => {
      if (loggedIn && this.oAuthService.hasValidAccessToken()) {
        console.log('Access token is valid.');
        this.router.navigate(['/dashboard']);  
      } else {
        window.location.reload(); // approach cause angular-oauth2-oidc
      }
    }).catch(err => {
      console.error('Error during discovery or login:', err);
      this.router.navigate(['/authentication']);
    });
  }
}
