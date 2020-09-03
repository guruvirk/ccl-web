import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Category } from 'src/app/models';
import { CatgoryService } from 'src/app/services/catgory.service';
import { SubCategory } from 'src/app/models';
import { SubCatgoryService } from 'src/app/services/sub-catgory.service';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})
export class EditSubCategoryComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  image: File;
  imageUrl: string | ArrayBuffer;
  subCategory: SubCategory;
  isNewImage = false
  categories: Category[] = []
  selectedCategory: string

  constructor(
    private api: SubCatgoryService,
    private auth: RoleService,
    private router: Router,
    private categoryApi: CatgoryService,
    private route: ActivatedRoute,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.route.params.subscribe(params => {
      if (params.id) {
        this.isLoading = true;
        this.api.get(params.id).subscribe(item => {
          this.subCategory = new SubCategory(item)
          this.selectedCategory = this.subCategory.category.id
          this.isLoading = false;
        }, err => {
          this.isLoading = false;
        })
      }
    }, err => {
      this.isLoading = false;
    })
    this.categoryApi.search({}).subscribe(page => {
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

  create() {
    if (!this.subCategory.name) {
      this.uxService.handleError("Name is Required")
      return
    }
    if ((!this.image || !this.imageUrl) && !this.subCategory.pic) {
      this.uxService.handleError("Please Select an Image")
      return
    }
    if (this.selectedCategory != this.subCategory.category.id) {
      this.subCategory.category = new Category({ id: this.selectedCategory })
    }
    this.isLoading = true
    if (this.isNewImage) {
      this.auth.upload(this.image).subscribe(url => {
        this.subCategory.pic = url
        this.api.update(this.subCategory.id, this.subCategory).subscribe(item => {
          this.isLoading = false;
          this.uxService.showInfo("Category Updated")
          this.router.navigate(["view-sub-categories"])
        }, err => {
          this.isLoading = false;
        })
      }, err => {
        this.isLoading = false;
      })
    } else {
      this.api.update(this.subCategory.id, this.subCategory).subscribe(item => {
        this.isLoading = false;
        this.uxService.showInfo("Category Updated")
        this.router.navigate(["view-sub-categories"])
      }, err => {
        this.isLoading = false;
      })
    }
  }

  addFilter() {
    this.subCategory.filters = this.subCategory.filters || []
    this.subCategory.filters.push({
      isSelected: false,
      label: null
    })
  }

  removeFilter(index) {
    this.subCategory.filters.splice(index, 1)
  }

  onImageSelect($event) {
    const files = $event.srcElement.files;
    this.image = files && files.length ? files[0] : null;
    const reader = new FileReader();
    reader.onload = e => this.imageUrl = reader.result;
    reader.readAsDataURL(this.image);
  }

  unSelect() {
    this.subCategory.pic = null
    this.image = null
    this.imageUrl = null
    this.isNewImage = true
  }

}
