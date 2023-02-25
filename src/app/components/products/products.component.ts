import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap } from "rxjs/operators";
import { zip } from "rxjs";

import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Input() products: Product[] = [];
  @Output() OnLoadMore: EventEmitter<string> = new EventEmitter<string>();

  @Input() set productId(id: string | null) {
    if(id) {
      this.onShowDetail(id);
    }
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  myShoppingCart: Product[] = [];
  total = 0
  today = new Date();
  showProductDetail = false;
  productChosen!: Product;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if(!this.showProductDetail) { this.showProductDetail = true }
    this.productsService.getProduct(id).subscribe(data => {
      this.productChosen = data;
      this.statusDetail = 'success';
    }, errorMessage => {
      window.alert(errorMessage)
      this.statusDetail = 'error';
    });
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'new',
      description: 'lorem',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 100,
      categoryId: 1
    }
    this.productsService.create(product).subscribe(data => {
      this.products.unshift(data);
    });
  }

  UpdateProduct() {
    const id = this.productChosen.id.toString();
    const changes: UpdateProductDTO = {
      title: 'nuevo titulo'
    }
    this.productsService.update(id, changes).subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  DeleteProduct() {
    const id = this.productChosen.id.toString();
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  LoadMore() {
    this.OnLoadMore.emit();
  }

  ReadAndUpdate(id: string) {
    this.productsService.getProduct(id).pipe(
      switchMap((product) => this.productsService.update(product.id.toString(), {title: 'newChange!'})),
    ).subscribe(data => {
      console.log(data);
    });

    zip(
      this.productsService.getProduct(id),
      this.productsService.update(id, {title: 'newChange!'})
    ).subscribe(response => {
      console.log(response[0]);
      console.log(response[1]);
    })
  }
}
