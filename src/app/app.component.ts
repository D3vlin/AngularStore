import { Component, OnInit } from '@angular/core';

import { AuthService } from "./services/auth.service";
import { TokenService } from "./services/token.service";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private AuthService: AuthService,
    private TokenService: TokenService,
  ) { }

  ngOnInit(): void {
    const token = this.TokenService.GetToken()
    if (token) {
      this.AuthService.getProfile().subscribe();
    }
  }
}
