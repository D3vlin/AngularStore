import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { saveAs } from "file-saver";
import { tap, map } from 'rxjs/operators';

import { environment } from "./../../environments/environment";

interface File {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = `${environment.API_URL}/api/files`;

  constructor(
    private HttpClient: HttpClient
  ) { }

  GetFile(name: string, url: string, type: string) {
    return this.HttpClient.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        const blob = new Blob([content], {type});
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  UploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.HttpClient.post<File>(`${this.apiUrl}/upload`, dto, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })
  }
}
