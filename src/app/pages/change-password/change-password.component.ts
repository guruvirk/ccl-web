import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { UxService } from '../../services/ux.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password: string;
  confirmPassword: string;
  oldPassword: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: RoleService,
    private uxService: UxService) { }

  ngOnInit() {
  }

  updatePassword() {
    if (!this.password) {
      this.uxService.handleError("Password is Required")
      return
    }
    if (!this.confirmPassword) {
      this.uxService.handleError("Confirm Password is Required")
      return
    }
    if (!this.oldPassword) {
      this.uxService.handleError("Current Password is Required")
      return
    }
    if (this.confirmPassword != this.password) {
      this.uxService.handleError("Password's Does't Match")
      return
    }
    this.auth.changePassword(this.auth.currentUser(), this.oldPassword, this.password).subscribe(() => {
      this.uxService.showInfo("Password Changed Successfully")
      this.auth.logout()
    }, err => {
      // this.isLoading = false;
    })
  }

}
