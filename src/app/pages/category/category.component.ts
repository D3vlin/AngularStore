import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product.model';

import { ProductsService } from "./../../services/products.service";

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

  constructor(
    private route: ActivatedRoute,
    private ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.ProductsService.GetByCategory(this.categoryId, this.limit, this.offset)
        .subscribe(data => {
          this.products = this.products.concat(data);
        });
      }
    });
  }

  LoadMore() {
    this.ProductsService.getProductsByPage(this.limit, this.offset).subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
