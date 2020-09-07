import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit, OnDestroy {

  url: string;
  screenWidth: number;

  constructor(
    private route: ActivatedRoute,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService,
    public dialogRef: MatDialogRef<ImageViewComponent>,) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
