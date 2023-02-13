import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateUserDTO, User } from '../models/user.model';

import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.API_URL}/api/users`;

  constructor(
    private httpClient: HttpClient
  ) { }

  Create(dto: CreateUserDTO) {
    return this.httpClient.post<User>(this.apiUrl, dto);
  }

  GetAll() {
    return this.httpClient.get<User[]>(this.apiUrl);
  }
}
