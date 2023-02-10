import { Component, OnInit } from '@angular/core';

import { StoreService } from "../../services/store.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.cart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  activeMenu = false;
  counter = 0;

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
}
