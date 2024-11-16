import { Injectable } from '@angular/core';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { AuthClaim } from '../domains/auth-claims.domain';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthValidateService {

  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  /**
   * 
   * @param oAuthService
   *  
   * the idea of this implementation it was take to the  hand of official documentation angular-oauth2-oidc
   * https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards
   */
  constructor(
    private oAuthService: OAuthService,
  ) { 
    // Useful for debugging:
    this.oAuthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error('OAuthErrorEvent Object:', event);
      } else {
        console.warn('OAuthEvent Object:', event);
      }
      this.updateAuthState();
    });

    // Initialize auth state based on current token status
    this.updateAuthState();
  }
  
  /**
   * subscriber to the current user session.
   */
  private updateAuthState() {
    const isLoggedIn = this.oAuthService.hasValidAccessToken();
    this.isAuthenticatedSubject$.next(isLoggedIn);
  }

  /**
   * starts the PKCE-based Authorization Code Flow
   * (Proof Key for Code Exchange).
   * 
   */
  public login() {
    this.oAuthService.initCodeFlow();
  }

  public logout() {
    this.oAuthService.logOut();
  }

  get isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  public identityClaims(): Observable<AuthClaim> {
    return of(this.oAuthService.getIdentityClaims()).pipe(
      map(claims => claims as AuthClaim)
    );
  }
    
  public hasValidToken(): boolean  { 
    return this.oAuthService.hasValidAccessToken(); 
  }

  public async loadDiscoveryDocument(): Promise<Boolean> {
    return this.oAuthService.loadDiscoveryDocumentAndTryLogin(); 
  }
}
