import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthNavGuardGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn) {
      window.alert("You are not allowed to access this URL as you are already Logged In!");
      this.router.navigate(["dashboard"]);
    }
    return true;
  }

}
