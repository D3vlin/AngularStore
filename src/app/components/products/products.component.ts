import { Component } from '@angular/core';

import { Product } from '../../models/product.model';

import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(
    private storeService: StoreService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  products: Product[] = [
    {
      id: 1,
      name: 'product1',
      img: '../assets/images/toy.jpg',
      price: 10
    },
    {
      id: 2,
      name: 'product2',
      img: '../assets/images/toy.jpg',
      price: 20
    },
    {
      id: 3,
      name: 'product3',
      img: '../assets/images/toy.jpg',
      price: 30
    },
    {
      id: 4,
      name: 'product4',
      img: '../assets/images/toy.jpg',
      price: 40
    }
  ];

  myShoppingCart: Product[] = [];

  total: number = 0

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
