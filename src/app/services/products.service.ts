import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { UpdateProductDTO, CreateProductDTO, Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products'

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllProducts() {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string) {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateProductDTO): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.httpClient.put<Product>(`${this.apiUrl}/${id}`, dto);
  }
}
