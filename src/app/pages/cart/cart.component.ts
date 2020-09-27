import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Item, Order } from 'src/app/models';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cart: Order;
  isMobile: boolean = false;
  isLoading = false;

  constructor(
    private auth: RoleService,
    private router: Router,
    private uxService: UxService,
    public dialog: MatDialog) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.get()
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  get() {
    this.cart = this.auth.getCart()
    let items = []
    if (this.cart.items && this.cart.items.length) {
      for (const item of this.cart.items) {
        items.push(item)
      }
    }
    this.cart.items = items
  }

  remove(item: Item) {
    this.auth.removeFromCart(item)
    this.get()
  }

  back() {
    this.uxService.back()
  }

  add(item) {
    ++item.quantity
    this.reCalculate()
  }

  subtract(item) {
    --item.quantity
    this.reCalculate()
  }

  reCalculate() {
    this.isLoading = true;
    this.cart.amount = 0
    if (this.cart.items && this.cart.items) {
      this.cart.items.forEach(item => {
        if (item.baseOption) {
          this.cart.amount = this.cart.amount + ((item.option.price + item.option.basePrice) * item.quantity)
        } else {
          this.cart.amount = this.cart.amount + (item.option.price * item.quantity)
        }
      });
    }
    this.auth.updateCart(this.cart)
    this.isLoading = false;
  }

}
