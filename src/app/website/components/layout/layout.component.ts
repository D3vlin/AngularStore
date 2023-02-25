import { Component } from '@angular/core';

import { UsersService } from "../../../services/users.service";
import { FilesService } from "../../../services/files.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  imgParent = '';
  imgUpload = '';

  constructor(
    private UsersService: UsersService,
    private FilesService: FilesService
  ) { }

  CreateUser() {
    this.UsersService.Create({ name: 'Alexis', email: 'alexis@email.com', password: '123' }).subscribe(data => {
      console.log(data);
    });
  }

  OnDownloadPdf() {
    this.FilesService.GetFile('MyPdf.txt', './assets/files/text.txt', 'application/txt').subscribe();
  }

  OnUpladFile(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.FilesService.UploadFile(file).subscribe(response => {
        this.imgUpload = response.location;
      });
    }
  }
}
