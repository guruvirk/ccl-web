import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { ItemService } from '../../services/item.service';
import { Item, Order, Transaction } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { OptionDialogComponent } from 'src/app/components/option-dialog/option-dialog.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  cart: Order
  isMobile = false
  number: number;
  month: number;
  year: number;
  cvc: number;
  error: string = "Invalid Details"
  isLoading = false;

  constructor(private api: OrderService,
    private transactioApi: TransactionService,
    private route: ActivatedRoute,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService,
    public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.isLoading = true;
        this.api.get(params.id).subscribe(item => {
          this.cart = item
          this.isLoading = false;
        })
      }
    })
    if (window.screen.width < 574) {
      this.isMobile = true
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  back() {
    this.uxService.back()
  }

  updated() {
    if (this.number && this.number.toString().length == 16 && this.month && this.year && this.cvc) {
      this.transactioApi.validate({
        "type": "card",
        "number": this.number,
        "month": this.month,
        "year": this.year,
        "cvc": this.cvc
      }).subscribe(item => {
        if (item == true) {
          this.error = null
        } else {
          this.error = item
        }
      })
    }
  }

  proceed() {
    if (this.error) {
      this.uxService.handleError("Invalid Card Details")
      return
    }
    this.isLoading = true;
    if (this.number && this.number.toString().length == 16 && this.month && this.year && this.cvc && this.cvc.toString().length > 2 && this.cvc.toString().length < 5) {
      this.transactioApi.pay(this.cart.transaction.id, {
        "type": "card",
        "number": this.number,
        "month": this.month,
        "year": this.year,
        "cvc": this.cvc
      }).subscribe(item => {
        this.isLoading = false;
        this.uxService.showInfo("Payment Successfull")
        this.router.navigate(["/order", this.cart.id])
      })
    } else {
      this.uxService.handleError("Invalid Card Details")
      this.isLoading = false;
      return
    }
  }

}
