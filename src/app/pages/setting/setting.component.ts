import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { User } from '../../models';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  code: string;
  codeValid: Boolean = false;
  user: User;

  constructor(private auth: RoleService,
    private router: Router,
    private uxService: UxService) {
    this.user = auth.currentUser()
  }

  ngOnInit() {
  }

  checkCodeValid() {
    if (this.code) {
      this.codeValid = this.auth.codeExists(this.code)
    }
  }

  change() {
    if (!this.code) {
      this.uxService.handleError("Username is Required")
      return
    }
    if (!this.codeValid) {
      this.uxService.handleError("Username is already taken")
      return
    }
    this.auth.changeCode(this.user, this.code).subscribe(user => {
      this.auth.changeUser(user)
      this.user = this.auth.currentUser()
      this.uxService.showInfo("Username changed successfully")
    }, err => {
      // this.isLoading = false;
    })
  }
}
