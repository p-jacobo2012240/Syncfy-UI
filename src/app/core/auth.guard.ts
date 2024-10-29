import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthValidateService } from './metrics/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthValidateService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/authentication']);
      return false;
    }
    return true;
  }  
}
