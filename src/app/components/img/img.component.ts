import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})

export class ImgComponent {
  @Input() img: string = 'img';
  @Output() loaded = new EventEmitter<string>();
  imgDefault: string = "./assets/images/default.png";

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('-imgLog: ');
    this.loaded.emit(this.img);
  }
}
