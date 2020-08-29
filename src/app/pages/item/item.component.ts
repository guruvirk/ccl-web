import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { ItemService } from '../../services/item.service';
import { Item } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { OptionDialogComponent } from 'src/app/components/option-dialog/option-dialog.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

  isMobile: boolean;
  item: Item;
  isLoading = false;

  constructor(private api: ItemService,
    private route: ActivatedRoute,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService,
    public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.isLoading = true;
        this.api.get(params.id).subscribe(item => {
          this.item = item
          this.isLoading = false;
        }, err => {
          this.isLoading = false;
        })
      }
    }, err => {
      this.isLoading = false;
    })
    if (window.screen.width < 781) {
      this.isMobile = true
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  selectImage(image: string) {
    this.item.pic = image
  }

  back() {
    this.uxService.back()
  }

  addToCart() {
    if (this.item.option.options && this.item.option.options.length > 1) {
      const dialogRef = this.dialog.open(OptionDialogComponent);
      dialogRef.componentInstance.options = this.item.option.options
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.price) {
          result.type = this.item.option.type
          this.auth.addToCart(this.item, result, 1)
          this.uxService.showInfo("Added to Cart Succesfully")
        }
      });
    } else {
      this.auth.addToCart(this.item, this.item.defaultOption, 1)
      this.uxService.showInfo("Added to Cart Succesfully")
    }
  }

}
