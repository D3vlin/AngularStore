import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private shoppingCart: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  addProduct(product: Product) {
    this.shoppingCart.push(product);
    this.cart.next(this.shoppingCart);
  }

  getTotal() {
    return this.shoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getShoppingCart() {
    return this.shoppingCart;
  }
}
