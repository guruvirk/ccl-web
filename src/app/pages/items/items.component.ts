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
import { IPager } from 'src/app/models/pager.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy, IPager<Item> {

  isMobile: boolean;
  query = {
    limit: 10,
    sort: "new"
  };
  page: Page<Item>;
  subCategory: SubCategory;
  category: Category;
  label: string;
  filters: {
    isSelected: boolean,
    label: String
  }[];
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
          this.subCategory = new SubCategory(item)
          if (this.subCategory && this.subCategory.filters && this.subCategory.filters.length) {
            this.filters = this.subCategory.filters
          } else {
            if (this.subCategory && this.subCategory.category) {
              this.filters = this.subCategory.category.filters
            }
          }
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
          this.category = new Category(item)
          if (this.category && this.category.filters && this.category.filters.length) {
            this.filters = this.category.filters
          }
          this.label = item.name
          this.isLoading = false
        }, err => {
          this.isLoading = false;
        })
      } else if (params.label) {
        this.label = params.label
      } else {
        this.categoryApi.search({}).subscribe(page => {
          for (const item of page.items) {
            let newItem = new Category(item)
            if (newItem.filters && newItem.filters.length) {
              this.filters = this.filters || []
              this.filters.push(...newItem.filters);
            }
          }
        })
      }
    })
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.get()
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  resetFilters() {
    for (const filter of this.filters) {
      filter.isSelected = false
    }
    this.get()
  }

  get(options?) {
    this.isLoading = true
    if (this.filters && this.filters.length) {
      let options = []
      for (const filter of this.filters) {
        if (filter.isSelected) {
          options.push(filter.label.toLowerCase())
        }
      }
      if (options.length) {
        this.query["options"] = options
      } else {
        delete this.query["options"];
      }
    } else {
      delete this.query["options"];
    }
    this.api.search(options || this.query).subscribe(page => {
      this.page = page
      this.page.totalPages = (page.total / page.limit)
      this.isLoading = false
    }, err => {
      this.isLoading = false;
    })
  }

  showPage(pageNo: number) {
    if (this.isLoading) {
      return;
    }
    if (pageNo === -2) {
      pageNo = 1;
      return;
    }

    if (pageNo === -1) {
      pageNo = (this.page.total / this.page.limit);
      return;
    }

    return this.get(this.convertToPageOption(pageNo));
  }

  private convertToPageOption(pageNo: number) {
    const options: any = {};
    if (this.page) {
      options.offset = (pageNo - 1) * this.page.limit;
      options.limit = this.page.limit;
      options.sort = this.page.sort;
    }
    return options;
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
