import { Component } from '@angular/core';

import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  products: Product[] = [
    {
      id: 1,
      name: 'product1',
      img: '../assets/images/toy.jpg',
      price: 0
    },
    {
      id: 2,
      name: 'product2',
      img: '../assets/images/toy.jpg',
      price: 0
    },
    {
      id: 3,
      name: 'product3',
      img: '../assets/images/toy.jpg',
      price: 0
    },
    {
      id: 4,
      name: 'product4',
      img: '../assets/images/toy.jpg',
      price: 0
    }
  ];

  onLoaded(img: string) {
    console.log('-appLog: ', img);
  }
}
