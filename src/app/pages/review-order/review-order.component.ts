import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Item, Order, Page } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent implements OnInit, OnDestroy {

  order: Order;
  isMobile: boolean = false;
  isLoading = false;
  items: {
    item: Item,
    value: number
  }[]

  constructor(
    private api: OrderService,
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
          this.order = new Order(item)
          if (this.order.status != "done" || this.order.reviewDone) {
            this.uxService.back()
          } else {
            this.items = []
            for (const item of this.order.items) {
              this.items.push({ item: item.item, value: 0 })
            }
          }
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

  submitReview() {
    let isValidated = true
    for (const item of this.items) {
      if (!item.value) {
        isValidated = false
      }
    }

    if (!isValidated) {
      this.uxService.handleError("Please review all items")
      return
    }
    this.isLoading = true
    this.api.review(this.order.id, { items: this.items }).subscribe(item => {
      this.uxService.showInfo("Review succesfull")
      this.isLoading = false
      this.router.navigate(["/order", item.id])
    }, err => {
      this.isLoading = false
    })
  }

  review(index, value) {
    this.items[index].value = value
  }

  back() {
    this.uxService.back()
  }

}
