import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Item, Order, Page } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  order: Order;
  isMobile: boolean = false;
  isLoading = false;

  constructor(
    private api: OrderService,
    private auth: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private uxService: UxService,
    public dialog: MatDialog) {
    if (window.screen.width < 574) {
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

}
