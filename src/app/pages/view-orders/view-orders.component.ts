import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Order, Page } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit, OnDestroy {

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
    this.router.navigate(["/edit-order", order.id])
  }

}
