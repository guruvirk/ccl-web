import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string
  phone: number
  email: string
  password: string
  confirmPassword: string
  phoneValid: Boolean = false
  isLoading = false;
  isMobile: boolean;

  constructor(private auth: RoleService,
    private router: Router,
    private uxService: UxService) {
    if (window.screen.width < 574) {
      this.isMobile = true
    }
  }

  ngOnInit() {
    if (this.auth.currentUser()) {
      this.router.navigate(["home"])
    }
  }

  checkPhoneValid() {
    if (this.phone) {
      this.phoneValid = this.auth.phoneExists(this.phone)
    }
  }

  back() {
    this.uxService.back()
  }

  register() {
    if (!this.phoneValid) {
      this.uxService.handleError("Mobile No is already taken")
      return
    }
    if (!this.email) {
      this.uxService.handleError("Email is required")
      return
    }
    if (this.confirmPassword != this.password) {
      this.uxService.handleError("Password Does't Match")
      return
    }
    this.isLoading = true;
    this.auth.register({
      name: this.name,
      password: this.password,
      phone: this.phone,
      email: this.email,
      isValidated: true
    }).subscribe(response => {
      if (response && response.id) {
        this.auth.changeUser(response)
        this.isLoading = false;
        this.uxService.handleError("SignUp Succesfull")
        this.router.navigate(["/"])
      }
      else {
        this.uxService.handleError("Error While Registering")
        this.isLoading = false;
        this.router.navigate(["/"])
      }
    })
  }

}
