import { Component } from '@angular/core';
import { RoleService } from './services/role.service';
import { User, Category, Order } from './models';
import { Tenant } from './models/tenant.model';
import { Router } from '@angular/router';
import { CatgoryService } from './services/catgory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User;
  currentTenant: Tenant;
  categories: Category[];
  cart: Order;

  constructor(
    public auth: RoleService,
    private roter: Router,
    private categoryService: CatgoryService
  ) {
    this.auth.userChanges.subscribe((user) => {
      this.currentUser = user;
    });
    this.auth.tenantChanges.subscribe((tenant) => {
      this.currentTenant = tenant;
    });
    this.categoryService.search({}).subscribe(page => {
      this.categories = page.items
    })
    this.auth.cartChanges.subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser();
    this.currentTenant = this.auth.currentTenant();
    this.cart = this.auth.getCart()
    // if (!this.currentUser) {
    //   this.roter.navigate(["login"])
    // }
    // this.userRefresh()
  }

  logout() {
    this.auth.logout()
  }

  // userRefresh() {
  //   if (this.auth.currentUser()) {
  //     this.auth.refreshUser()
  //   }
  //   let this_new = this
  //   setTimeout(function () {
  //     this_new.userRefresh()
  //   }, 30000)
  // }
}
