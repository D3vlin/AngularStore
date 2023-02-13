import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  SetToken(token: string) {
   localStorage.setItem('token', token);
  }

  GetToken() {
   return localStorage.getItem('token');
  }
}
