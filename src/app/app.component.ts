import { Component } from '@angular/core';
import { RoleService } from './services/role.service';
import { User, Category, Order, Item } from './models';
import { Tenant } from './models/tenant.model';
import { Router } from '@angular/router';
import { CatgoryService } from './services/catgory.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime, switchMap } from 'rxjs/operators';
import { ItemService } from './services/item.service';

export interface newUser {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  searchSelected = false
  currentUser: User;
  currentTenant: Tenant;
  categories: Category[];
  cart: Order;
  isMobile = false;
  myControl = new FormControl();
  options: Item[] = [];
  selectedItem: Item;
  // filteredOptions: Observable<Item[]>;

  constructor(
    private service: ItemService,
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
    if (window.screen.width < 781) {
      this.isMobile = true
    }
  }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser();
    this.currentTenant = this.auth.currentTenant();
    this.cart = this.auth.getCart()
    // if (!this.currentUser) {
    //   this.roter.navigate(["login"])
    // }
    // this.userRefresh()
    this.service.search({ limit: 5 }).subscribe(page => {
      this.options = page.items;
    })
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : value.name),
    //     map(name => name ? this._filter(name) : this.options.slice())
    //   );

    this.myControl.valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => this.service.search(value ? { name: value, limit: 5 } : { limit: 5 }))
    ).subscribe((page) => {
      this.options = page.items;
    });
  }

  displayFn(user: Item): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Item[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  logout() {
    this.auth.logout()
  }

  selectItem(id) {
    this.selectedItem = null
    this.searchSelected = false
    this.roter.navigate(["item", id])
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
