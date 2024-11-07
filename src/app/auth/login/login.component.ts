import { Component, OnInit } from '@angular/core';
import { AuthValidateService } from '../../core/metrics/services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthValidateService
  ) {}

  ngOnInit(): void {
    this.SignIn();
  }

  SignIn() {
    this.authService.login();
  }
}
