import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from "./../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private AuthService: AuthService,
    private Router: Router
  ) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.AuthService.user$
    .pipe(
      map(user => {
        if(!user) {
          this.Router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
}
