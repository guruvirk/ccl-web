import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Item, Order, User, Address } from 'src/app/models';
import { OrderService } from 'src/app/services/order.service';
import { TncDialogComponent } from 'src/app/components/tnc-dialog/tnc-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  cart: Order;
  isMobile: boolean = false;
  changeDetails: boolean = true;
  isTnc: boolean = true;
  user: User;
  isRegistered = false
  isLoading = false;
  emailError: string;
  isCod = false
  isPickup = false

  constructor(
    private api: OrderService,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService,
    public dialog: MatDialog) {
    if (window.screen.width < 781) {
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

  tncDialog() {
    const dialogRef = this.dialog.open(TncDialogComponent);
  }

  proceed() {
    if (!this.user.email) {
      this.uxService.handleError("Email is required")
      return
    }
    if (!this.user.phone) {
      this.uxService.handleError("Mobile is required")
      return
    }
    if (!this.user.firstName) {
      this.uxService.handleError("First Name is required")
      return
    }
    if (!this.user.lastName) {
      this.uxService.handleError("Last Name is required")
      return
    }
    if (!this.user.address.line1) {
      this.uxService.handleError("Street No is required")
      return
    }
    if (!this.user.address.line2) {
      this.uxService.handleError("Street Name is required")
      return
    }
    if (!this.user.address.city) {
      this.uxService.handleError("City is required")
      return
    }
    if (!this.user.address.suburb) {
      this.uxService.handleError("Suburb is required")
      return
    }
    if (!this.user.address.pinCode) {
      this.uxService.handleError("Post Code is required")
      return
    }
    if (!this.isTnc) {
      this.uxService.handleError("Please accept terms and conditions")
      return
    }
    this.isLoading = true;
    this.user.address.country = "New Zealand"
    this.cart.status = "pending"
    this.cart.address = new Address(this.user.address)
    if (this.isCod) {
      this.cart.method = "cod"
    } else {
      this.cart.method = "online"
    }
    if (this.isPickup) {
      this.cart.delivery = "pickup"
    } else {
      this.cart.delivery = "delivery"
    }
    if (this.isRegistered) {
      if (this.changeDetails) {
        this.auth.updateMyUser(this.user).subscribe(item => {
          this.auth.changeUser(item)
        })
      }
      this.api.create(this.cart).subscribe(cart => {
        this.uxService.showInfo("Order Created")
        this.cart = cart
        this.auth.emptyCart()
        this.isLoading = false;
        this.router.navigate(["/payment", cart.id])
      }, err => {
        this.isLoading = false;
      })
    } else {
      this.user.isValidated = true
      this.auth.register(this.user).subscribe(user => {
        this.user = user
        this.auth.changeUser(user)
        this.api.create(this.cart).subscribe(cart => {
          this.uxService.showInfo("Order Created")
          this.cart = cart
          this.auth.emptyCart()
          this.isLoading = false;
          this.router.navigate(["/payment", cart.id])
        }, err => {
          this.isLoading = false;
        })
      }, err => {
        this.isLoading = false;
      })
    }
  }

}
