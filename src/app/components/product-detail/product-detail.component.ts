import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { switchMap } from 'rxjs/operators';

import { Product } from '../../models/product.model';

import { ProductsService } from "./../../services/products.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;
  limit = 10;
  offset = 0;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ProductsService: ProductsService,
    private Location: Location
  ) { }

  ngOnInit(): void {
    this.ActivatedRoute.paramMap
    .pipe(
      switchMap( params => {
        this.productId = params.get('id');
        if (this.productId) {
          return this.ProductsService.getOne(this.productId);
        }
        return [null];
      })
    ).subscribe(data => {
      this.product = data;
    });
  }

  GoToBack() {
    this.Location.back();
  }
}
