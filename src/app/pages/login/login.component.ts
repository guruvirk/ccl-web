import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phone: Number
  password: String
  email: string
  isLoading = false
  isMobile: boolean;
  isPassVisible = false;

  constructor(private auth: RoleService,
    private router: Router,
    private uxService: UxService) { 
      if (window.screen.width < 781) {
        this.isMobile = true
      }
    }

  ngOnInit() {
    if (this.auth.currentUser()) {
      this.router.navigate([""])
    }
  }

  back() {
    this.uxService.back()
  }

  login() {
    if (!this.phone && !this.email) {
      this.uxService.handleError("Mobile No or Email is Required")
      return
    }
    if (!this.password) {
      this.uxService.handleError("Password is Required")
      return
    }
    if (this.phone) {
      this.auth.loginWithPhone(this.phone, this.password)
    }
    if (this.email) {
      this.auth.loginWithEmail(this.email, this.password)
    }
  }

  emptyEmail() {
    this.email = null
  }

  emptyPhone() {
    this.phone = null
  }

}
