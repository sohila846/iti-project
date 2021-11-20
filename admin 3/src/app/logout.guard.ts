import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var isAuthenticated = this.authService.isLoggedout();
      console.log(isAuthenticated)
      //console.log(isAuthenticated)
        if (!isAuthenticated) {
            this.router.navigate(['/admin-dashboard']);
            alert("you don't have permession please logout first")
        }
        return isAuthenticated;
  }
  
}
