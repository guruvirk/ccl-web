import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { SubCategory } from 'src/app/models';
import { SubCatgoryService } from 'src/app/services/sub-catgory.service';
import { Category } from 'src/app/models';
import { CatgoryService } from 'src/app/services/catgory.service';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  image: File;
  imageUrl: string | ArrayBuffer;
  subCategory: SubCategory = new SubCategory({})
  categories: Category[] = []

  constructor(
    private api: SubCatgoryService,
    private auth: RoleService,
    private router: Router,
    private categoryApi: CatgoryService,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.categoryApi.search({}).subscribe(page => {
      this.categories = page.items
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
    if (!this.image || !this.imageUrl) {
      this.uxService.handleError("Please Select an Image")
      return
    }
    this.isLoading = true
    this.auth.upload(this.image).subscribe(url => {
      this.subCategory.pic = url
      this.api.create(this.subCategory).subscribe(item => {
        this.isLoading = false;
        this.uxService.showInfo("Category Created")
        this.router.navigate(["view-sub-categories"])
      }, err => {
        this.isLoading = false;
      })
    }, err => {
      this.isLoading = false;
    })
  }

  addFilter() {
    this.subCategory.filters = this.subCategory.filters || []
    this.subCategory.filters.push({
      isSelected: false,
      label: null
    })
  }

  onImageSelect($event) {
    const files = $event.srcElement.files;
    this.image = files && files.length ? files[0] : null;
    const reader = new FileReader();
    reader.onload = e => this.imageUrl = reader.result;
    reader.readAsDataURL(this.image);
  }

  imageUpload() {

  }

}
