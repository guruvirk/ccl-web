import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { SubCatgoryService } from 'src/app/services/sub-catgory.service';
import { SubCategory, Category } from 'src/app/models';
import { CatgoryService } from 'src/app/services/catgory.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: SubCategory[];
  category: Category
  isLoading = false;

  constructor(private api: SubCatgoryService,
    private categoryApi: CatgoryService,
    private route: ActivatedRoute,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.isLoading = true;
        this.categoryApi.get(params.id).subscribe(item => {
          this.category = item
          this.api.search({ category: item.id }).subscribe(page => {
            this.categories = page.items
            this.isLoading = false;
          })
        })
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  select(category: SubCategory) {
    this.router.navigate(["/items"], { queryParams: { subCategory: category.id } })
  }

}
