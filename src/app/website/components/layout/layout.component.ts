import { Component } from '@angular/core';

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
    private FilesService: FilesService
  ) { }

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
