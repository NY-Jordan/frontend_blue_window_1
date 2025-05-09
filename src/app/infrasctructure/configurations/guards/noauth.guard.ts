import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuth = this.authService.isAuthenticated();
    console.log('NoAuthGuard - isAuthenticated:', isAuth);

    if (isAuth) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
