import { Component, OnInit } from '@angular/core';
import { switchMap } from "rxjs/operators";

import { StoreService } from "../../services/store.service";
import { AuthService } from "../../services/auth.service";

import { User } from "../../models/user.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.cart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  Login() {
    this.AuthService.Login('alexis@email.com', '123').pipe(
      switchMap((data) => {
        this.token = data.access_token;
        return this.AuthService.Profile(this.token);
      })
    ).subscribe(data => {
      this.profile = data;
    });
  }

  GetProfile() {
    this.AuthService.Profile(this.token).subscribe(data => {
      this.profile = data;
    });
  }
}
