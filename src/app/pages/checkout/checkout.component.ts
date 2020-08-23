import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Item, Order, User } from 'src/app/models';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  cart: Order;
  isMobile: boolean = false;
  user: User;
  isRegistered = false
  isLoading = false;
  emailError: string;

  constructor(
    private api: OrderService,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService) {
    if (window.screen.width < 574) {
      this.isMobile = true
    }
    this.get()
    this.user = this.auth.currentUser()
    if (!this.user) {
      this.user = this.auth.getLocalUser()
    } else {
      this.isRegistered = true
    }
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
    } else {
      this.router.navigate([""])
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
    this.cart.amount = 0
    if (this.cart.items && this.cart.items) {
      this.cart.items.forEach(item => {
        this.cart.amount = this.cart.amount + (item.option.price * item.quantity)
      });
    }
    this.auth.updateCart(this.cart)
  }

  proceed() {
    if (!this.user.email) {
      this.uxService.handleError("Email is required")
      return
    }
    if (!this.user.phone) {
      this.uxService.handleError("Telephone is required")
      return
    }
    if (!this.user.name) {
      this.uxService.handleError("Name is required")
      return
    }
    if (!this.user.address.line1) {
      this.uxService.handleError("Address 1 is required")
      return
    }
    if (!this.user.address.city) {
      this.uxService.handleError("City is required")
      return
    }
    if (!this.user.address.state) {
      this.uxService.handleError("State is required")
      return
    }
    if (!this.user.address.pinCode) {
      this.uxService.handleError("Postal Code is required")
      return
    }
    this.isLoading = true;
    if (this.isRegistered) {
      this.cart.status = "pending"
      this.api.create(this.cart).subscribe(cart => {
        this.uxService.showInfo("Order Created")
        this.cart = cart
        this.auth.emptyCart()
        this.isLoading = false;
        this.router.navigate(["/payment", cart.id])
      })
    } else {
      this.user.address.country = "New Zealand"
      this.user.isValidated = true
      this.auth.register(this.user).subscribe(user => {
        this.user = user
        this.auth.changeUser(user)
        this.cart.status = "pending"
        this.api.create(this.cart).subscribe(cart => {
          this.uxService.showInfo("Order Created")
          this.cart = cart
          this.auth.emptyCart()
          this.isLoading = false;
          this.router.navigate(["/payment", cart.id])
        })
      })
    }
  }

}
