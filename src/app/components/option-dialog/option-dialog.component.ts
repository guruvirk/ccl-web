import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-option-dialog',
  templateUrl: './option-dialog.component.html',
  styleUrls: ['./option-dialog.component.css']
})
export class OptionDialogComponent implements OnInit, OnDestroy {

  options: {
    label: string,
    price: number;
    actualPrice: number;
    code: string;
  }[];

  selectedOption: {
    label: string,
    price: number;
    actualPrice: number;
    code: string;
  }

  constructor(
    private route: ActivatedRoute,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService,
    public dialogRef: MatDialogRef<OptionDialogComponent>,) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  add() {
    if (!this.selectedOption) {
      this.uxService.handleError("Please Select One Option")
      return
    }
    this.dialogRef.close(this.selectedOption)
  }

  selectOption(option) {
    this.selectedOption = option
  }

}
