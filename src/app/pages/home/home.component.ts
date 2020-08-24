import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { CatgoryService } from '../../services/catgory.service';
import { Category } from 'src/app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  categories: Category[];
  isLoading = false;

  constructor(private api: CatgoryService,
    private route: ActivatedRoute,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService,
    private categoryService: CatgoryService) {
      this.isLoading = true;
      this.categoryService.search({}).subscribe(page => {
        this.categories = page.items
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  select(id) {
    this.router.navigate(["/category", id])
  }

}
