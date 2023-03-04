import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private AuthService: AuthService,
    private Router: Router,
  ) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.AuthService.user$
    .pipe(
      map(user => {
        if(user?.role === 'admin')
          return true;

        this.Router.navigate(['/home']);
        return false;
      })
    );
  }
}
