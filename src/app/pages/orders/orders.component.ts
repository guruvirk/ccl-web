import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Item, Order, Page } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  page: Page<Order>;
  isMobile: boolean = false;
  isLoading = false;

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
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  get() {
    this.isLoading = true;
    this.api.search({}).subscribe(page => {
      this.page = page
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    })
  }

  back() {
    this.uxService.back()
  }

  select(order: Order) {
    this.router.navigate(["/order", order.id])
  }

  review(order: Order) {
    this.router.navigate(["/review", order.id])
  }

  pay(order: Order) {
    this.router.navigate(["/payment", order.id])
  }

}
