import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() changeSideNavStatus = new EventEmitter<boolean>();

  constructor(
    public auth: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.auth.isAuthenticated$) {
      this.auth.idTokenClaims$.subscribe((claims) => console.log(claims));
     }
  }

  LogOut() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

  showSideMenu(){
    this.changeSideNavStatus.emit(true);
  }

}
