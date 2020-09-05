import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { SubCategory } from 'src/app/models';
import { SubCatgoryService } from 'src/app/services/sub-catgory.service';

@Component({
  selector: 'app-view-sub-categories',
  templateUrl: './view-sub-categories.component.html',
  styleUrls: ['./view-sub-categories.component.css']
})
export class ViewSubCategoriesComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  subCategories: SubCategory[];

  constructor(
    private api: SubCatgoryService,
    private auth: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.api.search({ status: "all" }).subscribe(page => {
      this.subCategories = []
      for (const item of page.items) {
        this.subCategories.push(new SubCategory(item))
      }
    })
  }

  ngOnInit() {
  }

  back() {
    this.uxService.back()
  }

  new() {
    this.router.navigate(["add-sub-category"])
  }

  edit(id: string) {
    this.router.navigate(["edit-sub-category", id])
  }

}
