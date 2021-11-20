import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any | UrlTree> | Promise<any | UrlTree> | any | UrlTree {
      var isAuthenticated = this.authService.isLoggedIn();
      console.log(isAuthenticated)
      //console.log(isAuthenticated)
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
            alert("you don't have permession please login first")
        }
        return isAuthenticated;

  }
  
}
