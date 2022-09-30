import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) public document: Document, 
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  SignIn() {
    this.auth.loginWithPopup().subscribe(()=> {
      console.log('logging done!')
      this.router.navigate(['/dashboard'])
    });
  }


}
