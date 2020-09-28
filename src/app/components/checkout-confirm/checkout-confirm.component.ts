import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Order, User } from 'src/app/models';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-checkout-confirm',
  templateUrl: './checkout-confirm.component.html',
  styleUrls: ['./checkout-confirm.component.css']
})
export class CheckoutConfirmComponent implements OnInit, OnDestroy {

  cart: Order;
  isMobile: boolean = false;
  user: User;
  isRegistered = false
  isCod = false
  isPickup = false

  constructor(
    private router: Router,
    private uxService: UxService,
    public dialogRef: MatDialogRef<CheckoutConfirmComponent>) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  confirm() {
    this.dialogRef.close(true)
  }

}
