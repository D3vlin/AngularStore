import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from "rxjs/operators";

import { environment } from "./../../environments/environment";
import { Auth } from "./../models/auth.model";
import { User } from "./../models/user.model";

import { TokenService } from "./../services/token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private httpClient: HttpClient,
    private TokenService: TokenService
  ) { }

  Login(email: string, password: string) {
    return this.httpClient.post<Auth>(`${this.apiUrl}/login`, { email , password }).pipe(
      tap(response => this.TokenService.SetToken(response.access_token))
    );
  }

  Profile() {
    return this.httpClient.get<User>(`${this.apiUrl}/profile`);
  }

  LoginAndGetProfile(email: string, password: string) {
    return this.Login(email, password).pipe(
      switchMap(() => this.Profile())
    )
  }
}
