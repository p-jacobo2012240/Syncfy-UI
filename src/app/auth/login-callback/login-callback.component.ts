/**
 * The purpose of a login callback component is to handle the OAuth2 authorization callback—the redirect 
 * back to your application after a successful login with the OAuth provider. Here’s why it’s useful in this context
 * 
 * Configure auth.config.ts = directUri: window.location.origin + '/login-callback',
 * 
 * Why Use loadDiscoveryDocumentAndTryLogin(): This method is essential for processing the callback from the identity provider. 
 * It checks for an authorization code or token in the URL, validates it, and exchanges it for tokens as necessary.
 * 
 * Redirecting within the Callback Component: The callback component can direct the user to another 
 * route (e.g., /dashboard) once the login process completes, ensuring a smooth user experience. 
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthValidateService } from '../../core/metrics/services/auth.service';

@Component({
  selector: 'app-login-callback',
  template: '<p>Logging in...</p>'
})
export class LoginCallbackComponent implements OnInit {

  constructor(
    private authService: AuthValidateService,
    private router: Router
  ) { }

  async ngOnInit() {
    try {
      await this.authService.loadDiscoveryDocument();
  
      if (this.authService.hasValidToken()) {
        console.log('Access token is valid.');
        this.router.navigate(['/dashboard']);
      } else {
        // Redirect to login if not logged in or token is invalid
        this.authService.login();
      }
    } catch (err) {
      console.error('Error during discovery or login:', err);
      this.router.navigate(['/authentication']);
    }
  }
}
