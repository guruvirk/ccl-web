import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { UxService } from '../../services/ux.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  id: string
  otp: number

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: RoleService,
    private uxService: UxService) {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id
      }
    })
  }

  ngOnInit() {
    if (!this.id) {
      this.router.navigate(["register"])
    }
  }

  confirm() {
    if (!this.otp) {
      this.uxService.handleError("Otp is Required")
      return
    }
    this.auth.confirm(this.id, this.otp)
  }

}
