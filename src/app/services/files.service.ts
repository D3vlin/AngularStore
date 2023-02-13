import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { saveAs } from "file-saver";
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

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
}
