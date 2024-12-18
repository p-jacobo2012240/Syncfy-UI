import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthValidateService } from '../../core/metrics/services/auth.service';
import { menuOptions, SideMenu } from '../dashboard-utils';
import { filter, Observable, pipe, switchMap, take, tap } from 'rxjs';
import { AuthClaim } from 'src/app/core/metrics/domains/auth-claims.domain';
import { UserInfoService } from 'src/app/core/metrics/services/user-info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  public mobileQuery: MediaQueryList;
  public fillerNav: SideMenu[] = []; 
  public authClaims$?: Observable<AuthClaim>;
  private _mobileQueryListener: () => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher,
    private authService: AuthValidateService,
    private userInfoService: UserInfoService
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.authClaims$ = this.authService.isAuthenticated$
      .pipe(
        filter(isAuthenticated => isAuthenticated),
        take(2),
        switchMap(() => this.authService.identityClaims()),
        tap(claims => {
          if (claims) {
            this.userInfoService.checkIfExistOAuth(claims);
          }
        })
    );
    
    this.fillerNav = menuOptions;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  LogOut() {
    this.authService.logout();
  }
}
