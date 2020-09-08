import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Category } from 'src/app/models';
import { CatgoryService } from 'src/app/services/catgory.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  image: File;
  imageUrl: string | ArrayBuffer;
  category: Category;
  isNewImage = false

  constructor(
    private api: CatgoryService,
    private auth: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.route.params.subscribe(params => {
      if (params.id) {
        this.isLoading = true;
        this.api.get(params.id).subscribe(item => {
          this.category = new Category(item)
          this.isLoading = false;
        }, err => {
          this.isLoading = false;
        })
      }
    }, err => {
      this.isLoading = false;
    })
  }

  ngOnInit() {
  }

  back() {
    this.uxService.back()
  }

  create() {
    if (!this.category.name) {
      this.uxService.handleError("Name is Required")
      return
    }
    if ((!this.image || !this.imageUrl) && !this.category.pic) {
      this.uxService.handleError("Please Select an Image")
      return
    }
    this.isLoading = true
    if (this.isNewImage) {
      this.auth.upload(this.image).subscribe(url => {
        this.category.pic = url
        this.api.update(this.category.id, this.category).subscribe(item => {
          this.isLoading = false;
          this.uxService.showInfo("Category Updated")
        }, err => {
          this.isLoading = false;
        })
      }, err => {
        this.isLoading = false;
      })
    } else {
      this.api.update(this.category.id, this.category).subscribe(item => {
        this.isLoading = false;
        this.uxService.showInfo("Category Updated")
        this.router.navigate(["view-categories"])
      }, err => {
        this.isLoading = false;
      })
    }
  }

  addFilter() {
    this.category.filters = this.category.filters || []
    this.category.filters.push({
      isSelected: false,
      label: null
    })
  }

  removeFilter(index) {
    this.category.filters.splice(index, 1)
  }

  onImageSelect($event) {
    const files = $event.srcElement.files;
    this.image = files && files.length ? files[0] : null;
    const reader = new FileReader();
    reader.onload = e => this.imageUrl = reader.result;
    reader.readAsDataURL(this.image);
  }

  unSelect() {
    this.category.pic = null
    this.image = null
    this.imageUrl = null
    this.isNewImage = true
  }

}
