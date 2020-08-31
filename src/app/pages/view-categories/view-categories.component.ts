import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Category } from 'src/app/models';
import { CatgoryService } from 'src/app/services/catgory.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  categories: Category[];

  constructor(
    private api: CatgoryService,
    private auth: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.api.search({}).subscribe(page => {
      this.categories = []
      for (const item of page.items) {
        this.categories.push(new Category(item))
      }
    })
  }

  ngOnInit() {
  }

  back() {
    this.uxService.back()
  }

  new() {
    this.router.navigate(["add-category"])
  }

  edit(id: string) {
    this.router.navigate(["edit-category", id])
  }

}
