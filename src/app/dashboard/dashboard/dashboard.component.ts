import { MediaMatcher } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public mobileQuery: MediaQueryList;

  public fillerNav = Array.from({ length: 10 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(
    public auth: AuthService, 
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    if(this.auth.isAuthenticated$) {
     this.auth.idTokenClaims$.subscribe((claims) => console.log(claims));
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  LogOut() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

}
