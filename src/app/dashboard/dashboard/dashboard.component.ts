import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public showSideNav: boolean = false;
  public showConfiguration: boolean = false;


  constructor(
    public auth: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.auth.isAuthenticated$) {
     this.auth.idTokenClaims$.subscribe((claims) => console.log(claims));
    }
  }

  changeSideNavStatus(status: boolean) {
    if(this.showSideNav) {
      this.showSideNav = false;
    } else {
      this.showSideNav = status;
    }
    console.log('the value is', status)
  }

  tempNavigation(view: string) {
    this.showSideNav = false;
    console.log('view action', view)
    if(view == 'metrics') {
      this.showConfiguration = true;
    }
  }

}
