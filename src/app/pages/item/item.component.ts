import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { ItemService } from '../../services/item.service';
import { Item } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { ImageViewComponent } from 'src/app/components/image-view/image-view.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

  isMobile: boolean;
  item: Item;
  isLoading = false;
  baseOption: boolean = true
  currentOption: {
    label: string;
    price: number;
    actualPrice: number;
    basePrice: number;
    code: string;
    type: string;
    availability: boolean;
  }
  zoomImage: string

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
          this.item = new Item(item)
          this.currentOption = this.item.defaultOption
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

  selectOption(index: number) {
    let selectedOption = this.item.option.options[index]
    this.currentOption = {
      label: selectedOption.label,
      price: selectedOption.price,
      actualPrice: selectedOption.actualPrice,
      basePrice: selectedOption.basePrice,
      code: selectedOption.code,
      type: this.item.option.type,
      availability: selectedOption.availability
    }
  }

  selectImage(image: string) {
    this.item.pic = image
  }

  back() {
    this.uxService.back()
  }

  addToCart() {
    this.auth.addToCart(this.item, this.currentOption, 1, this.baseOption || false)
    this.uxService.addToCart("Added to Cart Succesfully")
  }

  viewImage(pic) {
    const dialogRef = this.dialog.open(ImageViewComponent);
    dialogRef.componentInstance.url = pic
    // dialogRef.componentInstance.screenWidth = this.screenWidth
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
