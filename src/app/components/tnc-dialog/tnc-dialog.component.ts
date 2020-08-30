import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tnc-dialog',
  templateUrl: './tnc-dialog.component.html',
  styleUrls: ['./tnc-dialog.component.css']
})
export class TncDialogComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService,
    public dialogRef: MatDialogRef<TncDialogComponent>,) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
