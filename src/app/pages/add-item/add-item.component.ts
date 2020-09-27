import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { SubCategory, Item } from 'src/app/models';
import { SubCatgoryService } from 'src/app/services/sub-catgory.service';
import { Category } from 'src/app/models';
import { CatgoryService } from 'src/app/services/catgory.service';
import { ItemService } from 'src/app/services/item.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  item: Item = new Item({})
  categories: Category[] = []
  subCategories: SubCategory[] = []

  images: { url: string | ArrayBuffer, file: File, link: string }[]

  constructor(
    private api: ItemService,
    private auth: RoleService,
    private router: Router,
    private categoryApi: CatgoryService,
    private subCategoryApi: SubCatgoryService,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.categoryApi.search({ status: 'active' }).subscribe(page => {
      this.categories = page.items
    })
  }

  ngOnInit() {
  }

  back() {
    this.uxService.back()
  }

  getSubCategories() {
    if (this.item.category) {
      this.subCategoryApi.search({ status: 'active', category: this.item.category.id }).subscribe(page => {
        this.subCategories = page.items
      })
    }
  }

  create() {
    if (!this.item.name) {
      this.uxService.handleError("Name is Required")
      return
    }
    if (!this.item.code) {
      this.uxService.handleError("Code is Required")
      return
    }
    if (!this.item.description) {
      this.uxService.handleError("Description is Required")
      return
    }
    if (!this.item.category) {
      this.uxService.handleError("Category is Required")
      return
    }
    if (this.subCategories && this.subCategories.length && !this.item.subCategory) {
      this.uxService.handleError("Sub Category is Required")
      return
    }
    if (!this.item.option.type) {
      this.uxService.handleError("Option Type are Required")
      return
    }
    if (!this.item.option.options || !this.item.option.options.length) {
      this.uxService.handleError("Options are Required")
      return
    }
    if (!this.images.length) {
      this.uxService.handleError("Please Select an Image")
      return
    }
    this.item.defaultOption = {
      type: this.item.option.type,
      price: this.item.option.options[0].price,
      label: this.item.option.options[0].label,
      basePrice: this.item.option.options[0].basePrice,
      actualPrice: this.item.option.options[0].actualPrice,
      availability: this.item.option.options[0].availability,
      code: this.item.option.options[0].code,
    }
    this.isLoading = true
    this.upload().subscribe(value => {
      if (value) {
        this.item.pic = this.images[0].link
        this.item.images = []
        for (const image of this.images) {
          this.item.images.push(image.link)
        }
        this.api.create(this.item).subscribe(item => {
          this.isLoading = false;
          this.uxService.showInfo("Item Created")
          this.router.navigate(["view-items"])
        }, err => {
          this.isLoading = false;
        })
      } else {
        this.isLoading = false;
      }
    })

  }

  addTags() {
    this.item.tags = this.item.tags || []
    this.item.tags.push("")
  }

  addImages() {
    this.images = this.images || []
    this.images.push({
      url: null,
      file: null,
      link: null
    })
  }


  addOptions() {
    this.item.option.options = this.item.option.options || []
    this.item.option.options.push({
      label: null,
      price: null,
      actualPrice: null,
      basePrice: null,
      code: null,
      availability: null
    })
  }

  onImageSelect($event, index) {
    const files = $event.srcElement.files;
    this.images[index].file = files && files.length ? files[0] : null;
    const reader = new FileReader();
    reader.onload = e => this.images[index].url = reader.result;
    reader.readAsDataURL(this.images[index].file);
  }

  unSelect(index) {
    this.images.splice(index, 1)
  }

  unSelectOption(index) {
    this.item.option.options.splice(index, 1)
  }

  unSelectTag(index) {
    this.item.tags.splice(index, 1)
  }

  upload(): Observable<boolean> {
    let totalUploads = 0
    let uploader = new Subject<boolean>()
    for (const image of this.images) {
      if (!image.url || !image.file) {
        totalUploads++
        if (totalUploads == this.images.length) {
          uploader.next(true)
        }
      } else {
        this.auth.upload(image.file).subscribe(url => {
          image.link = url
          totalUploads++
          if (totalUploads == this.images.length) {
            uploader.next(true)
          }
        }, err => {
          uploader.next(false)
        })
      }
    }
    return uploader.asObservable()
  }

}
