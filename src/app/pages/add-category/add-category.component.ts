import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Category } from 'src/app/models';
import { CatgoryService } from 'src/app/services/catgory.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  image: File;
  imageUrl: string | ArrayBuffer;
  category: Category = new Category({})

  constructor(
    private api: CatgoryService,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
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
    if (!this.image || !this.imageUrl) {
      this.uxService.handleError("Please Select an Image")
      return
    }
    this.isLoading = true
    this.auth.upload(this.image).subscribe(url => {
      this.category.pic = url
      this.api.create(this.category).subscribe(item => {
        this.isLoading = false;
        this.uxService.showInfo("Category Created")
      }, err => {
        this.isLoading = false;
      })
    }, err => {
      this.isLoading = false;
    })
  }

  addFilter() {
    this.category.filters = this.category.filters || []
    this.category.filters.push({
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
