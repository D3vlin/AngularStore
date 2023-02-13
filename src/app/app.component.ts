import { Component } from '@angular/core';

import { UsersService } from "./services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  constructor(
    private UsersService: UsersService
  ) { }

  onLoaded(img: string) {
    console.log('-appLog: ', img);
  }

  CreateUser() {
    this.UsersService.Create({ name: 'Alexis', email: 'alexis@email.com', password: '123' }).subscribe(date => {

    });
  }
}
