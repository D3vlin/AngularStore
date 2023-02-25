import { Component, OnInit } from '@angular/core';

import { StoreService } from "../../services/store.service";
import { AuthService } from "../../services/auth.service";
import { CategoriesService } from "../../services/categories.service";

import { Category } from "../../models/category.model";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private AuthService: AuthService,
    private CategoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.cart$.subscribe(products => {
      this.counter = products.length;
    });
    this.GetAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  LoginAndGetProfile() {
    this.AuthService.LoginAndGetProfile('alexis@email.com', '123')
    .subscribe(data => {
      this.profile = data;
    });
  }

  GetAllCategories() {
    this.CategoriesService.GetAll()
    .subscribe(date => {
      this.categories = date;
    });
  }
}
