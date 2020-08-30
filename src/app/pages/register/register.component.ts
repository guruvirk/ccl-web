import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Address } from 'src/app/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string;
  lastName: string
  phone: number
  email: string
  password: string
  confirmPassword: string
  phoneValid: Boolean = false
  isLoading = false;
  isMobile: boolean;
  address: Address = new Address;

  constructor(private auth: RoleService,
    private router: Router,
    private uxService: UxService) {
    if (window.screen.width < 781) {
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
    if (!this.firstName) {
      this.uxService.handleError("First Name is required")
      return
    }
    if (!this.lastName) {
      this.uxService.handleError("Last Name is required")
      return
    }
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
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      phone: this.phone,
      email: this.email,
      address: this.address,
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
    }, err => {
      this.isLoading = false;
    })
  }

}
