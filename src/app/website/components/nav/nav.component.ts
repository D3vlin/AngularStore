import { Component, OnInit } from '@angular/core';

import { StoreService } from "../../../services/store.service";
import { AuthService } from "../../../services/auth.service";
import { CategoriesService } from "../../../services/categories.service";
import { UsersService } from "../../../services/users.service";

import { Category } from "../../../models/category.model";
import { User } from "../../../models/user.model";

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
  profileCreated = false;

  constructor(
    private storeService: StoreService,
    private AuthService: AuthService,
    private CategoriesService: CategoriesService,
    private UsersService: UsersService,
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

  CreateUser() {
    this.UsersService.Create({ name: 'Alexis', email: 'alexis@email.com', password: '123' })
    .subscribe(() => {
      this.profileCreated = true;
    });
  }
}
