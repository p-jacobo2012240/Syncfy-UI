import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthDomain, AuthDtoPayloadDomain } from '../domains/auth.domain';
import { environment } from '../../../../environments/environment';
import { AuthCreator } from '../domains/auth-creator.domain';


@Injectable({
  providedIn: 'root'
})
export class AuthValidateService {
  
  readonly API_URL = environment.syncfyManagement.apiURL;
  readonly PORT =  environment.syncfyManagement.port;
  readonly httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private httpClient: HttpClient
  ) { }
  
  checkIfExistOAuth(rawData: AuthDomain) : void {
    
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
      });
  }

  newOAuthRegister(authDomain: AuthDomain) : void {
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
  }
  

}
