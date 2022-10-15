import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthValidateService } from '../../core/metrics/services/auth.service';
import { Router } from '@angular/router';
import { menuOptions, SideMenu } from '../dashboard-utils';
import { AuthDomain, AuthDtoPayloadDomain } from 'src/app/core/metrics/domains/auth.domain';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public mobileQuery: MediaQueryList;
  public fillerNav: SideMenu[] = []; 
  private authDomain: AuthDomain = new AuthDomain();
  
  private _mobileQueryListener: () => void;

  constructor(
    public auth: AuthService, 
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher,
    private authValidate: AuthValidateService
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    if(this.auth.isAuthenticated$) {
      this.auth.idTokenClaims$.subscribe((claims) => {
        console.log('success logged!') 
        
        // TEMP APPROACH
        this.authDomain.email = (claims?.email) ? claims.email : '';
        this.authDomain.aud = (claims?.aud) ? claims.aud : '';
        this.authDomain.iss = (claims?.iss) ? claims.iss : '';
        this.authDomain.nonce = (claims?.nonce) ? claims.nonce : '';
        this.authDomain.picture = (claims?.picture) ? claims.picture : '';
        
        this.authValidate.checkIfExistOAuth(this.authDomain); 
      });
      this.fillerNav = menuOptions;
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  LogOut() {
    localStorage.removeItem('oauth')
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

}
