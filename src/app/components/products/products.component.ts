import { Component } from '@angular/core';

import { Product } from '../../models/product.model';

import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  products: Product[] = [];

  myShoppingCart: Product[] = [];

  total: number = 0

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
