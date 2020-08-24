import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { ItemService } from '../../services/item.service';
import { Item, SubCategory, Category, Page } from 'src/app/models';
import { CatgoryService } from 'src/app/services/catgory.service';
import { SubCatgoryService } from 'src/app/services/sub-catgory.service';
import { OptionDialogComponent } from 'src/app/components/option-dialog/option-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {

  isMobile: boolean;
  query = {
    limit: 6
  };
  page: Page<Item>;
  subCategory: SubCategory;
  category: Category;
  label: string;
  isLoading = false;

  constructor(private api: ItemService,
    private subCategoryApi: SubCatgoryService,
    private categoryApi: CatgoryService,
    private route: ActivatedRoute,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService,
    public dialog: MatDialog) {
    this.route.queryParams.subscribe(params => {
      if (params.subCategory) {
        this.isLoading = true
        this.query["subCategory"] = params.subCategory
        this.subCategoryApi.get(params.subCategory).subscribe(item => {
          this.subCategory = item
          this.category = item.category
          this.label = item.name
          this.isLoading = false
        }, err => {
          this.isLoading = false;
        })
      } else if (params.category) {
        this.isLoading = true
        this.query["category"] = params.category
        this.categoryApi.get(params.category).subscribe(item => {
          this.category = item
          this.label = item.name
          this.isLoading = false
        }, err => {
          this.isLoading = false;
        })
      } else if (params.label) {
        this.label = params.label
      }
    })
    if (window.screen.width < 574) {
      this.isMobile = true
    }
    this.get()
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  get() {
    this.isLoading = true
    this.api.search(this.query).subscribe(page => {
      this.page = page
      this.isLoading = false
    }, err => {
      this.isLoading = false;
    })
  }

  select(item: Item) {
    this.router.navigate(["/item", item.id])
  }

  back() {
    this.uxService.back()
  }

  getSecandoryPic(item: Item): string {
    if (item.images && item.images.length) {
      if (item.images.length > 1) {
        return item.images[1]
      } else {
        return item.images[0]
      }
    } else {
      return item.pic
    }
  }

  addToCart(item: Item) {
    if (item.option.options && item.option.options.length > 1) {
      const dialogRef = this.dialog.open(OptionDialogComponent);
      dialogRef.componentInstance.options = item.option.options
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.price) {
          result.type = item.option.type
          this.auth.addToCart(item, result, 1)
          this.uxService.showInfo("Added to Cart Succesfully")
        }
      });
    } else {
      this.auth.addToCart(item, item.defaultOption, 1)
      this.uxService.showInfo("Added to Cart Succesfully")
    }
  }

}
