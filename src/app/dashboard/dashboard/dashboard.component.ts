import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthValidateService } from '../../core/metrics/services/auth.service';
import { Router } from '@angular/router';
import { menuOptions, SideMenu } from '../dashboard-utils';
// import { AuthDomain, AuthDtoPayloadDomain } from 'src/app/core/metrics/domains/auth.domain';
import { Observable } from 'rxjs';
import { AuthKeycloackClaim } from 'src/app/core/metrics/domains/auth-claims.domain';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  public mobileQuery: MediaQueryList;
  public fillerNav: SideMenu[] = []; 
  public authClaims$?: Observable<AuthKeycloackClaim>;
  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher,
    private authService: AuthValidateService
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.authClaims$ = this.authService.identityClaims();

    if(this.authService.isLoggedIn) {
      
      this.authService
        .identityClaims()
        .subscribe((claims) =>  this.authService.checkIfExistOAuth(claims));
      
        this.fillerNav = menuOptions;
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  LogOut() {
    localStorage.removeItem('oauth')
    this.authService.logout();
    this.router.navigateByUrl('/authentication');
  }

}
