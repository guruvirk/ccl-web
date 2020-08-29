import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { MatDialogRef } from '@angular/material';
import { Order } from 'src/app/models';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit, OnDestroy {

  order: Order
  isMobile: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService,
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
