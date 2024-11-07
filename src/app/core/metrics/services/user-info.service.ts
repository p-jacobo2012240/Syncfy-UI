import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthClaim } from '../domains/auth-claims.domain';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  readonly API_URL = environment.syncfyManagement.apiURL;
  readonly PORT = environment.syncfyManagement.port;
  readonly httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private httpClient: HttpClient
  ) { }

  checkIfExistOAuth(claims: Observable<AuthClaim>) : void { 
    claims.subscribe((claim) => {
      const { sub, email, name, roles } = claim;

      const payload = { 
        keycloak_user_id: sub,
        email: email,
        username: name,
        roles:  roles || []
       }
      
      const OAuth = this.httpClient
      .post(`${this.API_URL}:${this.PORT}/auth/check-auth`, payload, { headers: this.httpHeaders })
      .pipe( 
        map((response: any) => response as AuthClaim),
        catchError(e => throwError(() => e))
      );
    });
    
  

    /*
    const { email } = rawData;
    let payload: AuthDtoPayloadDomain = { email: email}
    
    const OAuth = this.httpClient
      .post(`${this.API_URL}:${this.PORT}/auth/check-auth`, payload, { headers: this.httpHeaders })
      .pipe( 
        map((response: any) => response as AuthDomain),
        catchError(e => throwError(e))
      );

      //Resolve auth
      OAuth.subscribe((authDomain: AuthDomain) =>{
        if(!authDomain) {
          this.newOAuthRegister(rawData)
        } else {
          localStorage.setItem('oauth', JSON.stringify(authDomain))
        }
      }); */

  }

  newOAuthRegister(authDomain: AuthClaim) : void {
    
    /*
    const {email, aud, iss, nonce, picture } = authDomain;
    const creator: AuthCreator = { email, aud, iss, nonce, picture }
    
    console.log('creator', creator)
    this.httpClient.post(`${this.API_URL}:${this.PORT}/auth/log-auth`, creator, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response as AuthDomain),
        catchError(e => throwError(e))
      ).subscribe((auth: AuthDomain) => {
        localStorage.setItem('oauth', JSON.stringify(authDomain))
      });
      */
  }


}
