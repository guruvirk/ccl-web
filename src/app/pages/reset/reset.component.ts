import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { UxService } from '../../services/ux.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  otpSent: Boolean = false;
  phone: Number;
  otp: string;
  password: string;
  confirmPassword: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: RoleService,
    private uxService: UxService) { }

  ngOnInit() {
    if (this.auth.currentUser()) {
      this.router.navigate(["home"])
    }
  }

  confirm() {
    if (!this.phone) {
      this.uxService.handleError("Mobile No is Required")
      return
    }
    this.auth.sendOtp(this.phone).subscribe(() => {
      this.otpSent = true
    })
  }

  updatePassword() {
    if (!this.otp) {
      this.uxService.handleError("Otp is Required")
      return
    }
    if (!this.password) {
      this.uxService.handleError("Password is Required")
      return
    }
    if (!this.confirmPassword) {
      this.uxService.handleError("Confirm Password is Required")
      return
    }
    if (this.confirmPassword != this.password) {
      this.uxService.handleError("Password's Does't Match")
      return
    }
    this.auth.changePasswordWithOtp(this.phone, this.otp, this.password).subscribe(() => {
      this.uxService.showInfo("Password Changed Successfully")
      this.router.navigate(["/","login"])
    })
  }

}
