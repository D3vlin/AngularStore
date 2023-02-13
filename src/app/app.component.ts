import { Component } from '@angular/core';

import { UsersService } from "./services/users.service";
import { FilesService } from "./services/files.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  constructor(
    private UsersService: UsersService,
    private FilesService: FilesService
  ) { }

  onLoaded(img: string) {
    console.log('-appLog: ', img);
  }

  CreateUser() {
    this.UsersService.Create({ name: 'Alexis', email: 'alexis@email.com', password: '123' }).subscribe(data => {
      console.log(data);
    });
  }

  OnDownloadPdf() {
    this.FilesService.GetFile('MyPdf.txt', './assets/files/text.txt', 'application/txt').subscribe();
  }
}
