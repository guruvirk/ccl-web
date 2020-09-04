import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Item, Order, Page, Transaction, Tracking } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { TrackingService } from 'src/app/services/tracking.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit, OnDestroy {

  order: Order;
  isMobile: boolean = false;
  isLoading = false;

  constructor(
    private api: OrderService,
    private transactionApi: TransactionService,
    private trackingApi: TrackingService,
    private auth: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private uxService: UxService,
    public dialog: MatDialog) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.route.params.subscribe(params => {
      if (params.id) {
        this.isLoading = true;
        this.api.get(params.id).subscribe(item => {
          this.order = item
          this.isLoading = false;
        }, err => {
          this.isLoading = false;
        })
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  back() {
    this.uxService.back()
  }

  create() {
    this.isLoading = true
    this.api.update(this.order.id, this.order).subscribe(order => {
      this.transactionApi.update(this.order.transaction.id, this.order.transaction).subscribe(transaction => {
        this.trackingApi.update(this.order.tracking.id, this.order.tracking).subscribe(tracking => {
          this.api.get(this.order.id).subscribe(item => {
            this.order = new Order(item)
            this.uxService.showInfo("Updated Succesfully")
            this.isLoading = false
          }, err => {
            this.isLoading = false
          })
        }, err => {
          this.isLoading = false
        })
      }, err => {
        this.isLoading = false
      })
    }, err => {
      this.isLoading = false
    })
  }

}
