import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { SubCategory, Item } from 'src/app/models';
import { SubCatgoryService } from 'src/app/services/sub-catgory.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  items: Item[];

  constructor(
    private api: ItemService,
    private auth: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.api.search({status: "all"}).subscribe(page => {
      this.items = []
      for (const item of page.items) {
        this.items.push(new Item(item))
      }
    })
  }

  ngOnInit() {
  }

  back() {
    this.uxService.back()
  }

  new() {
    this.router.navigate(["add-item"])
  }

  edit(id: string) {
    this.router.navigate(["edit-item", id])
  }

}
