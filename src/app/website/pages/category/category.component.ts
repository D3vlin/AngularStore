import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Product } from '../../../models/product.model';

import { ProductsService } from "../../../services/products.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.paramMap
    .pipe(
      switchMap( params => {
        this.categoryId = params.get('id');
        if (this.categoryId) {
          return this.ProductsService.GetByCategory(
            this.categoryId,
            this.limit,
            this.offset
          );
        }
        return [];
      })
    ).subscribe(data => {
      this.products = data;
    });

    this.ActivatedRoute.queryParamMap
    .subscribe(params => {
      this.productId = params.get('product');
    });
  }

  LoadMore() {
    this.ProductsService.getProductsByPage(this.limit, this.offset).subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
