import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { SubCategory, Item } from 'src/app/models';
import { SubCatgoryService } from 'src/app/services/sub-catgory.service';
import { Category } from 'src/app/models';
import { CatgoryService } from 'src/app/services/catgory.service';
import { ItemService } from 'src/app/services/item.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  item: Item = new Item({})
  categories: Category[] = []
  subCategories: SubCategory[] = []
  subCategory: SubCategory;
  selectedCategory: string;
  selectedSubCategory: string;
  category: Category;
  tags: { label: string }[]

  images: { url: string | ArrayBuffer, file: File, link: string }[]

  constructor(
    private api: ItemService,
    private auth: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryApi: CatgoryService,
    private subCategoryApi: SubCatgoryService,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.route.params.subscribe(params => {
      if (params.id) {
        this.isLoading = true;
        this.api.get(params.id).subscribe(item => {
          this.item = new Item(item)
          this.tags = []
          if (this.item.tags && this.item.tags.length) {
            for (const tag of this.item.tags) {
              this.tags.push({
                label: tag
              })
            }
          }
          this.category = new Category(item.category)
          this.selectedCategory = this.category.id
          this.subCategory = new SubCategory(item.subCategory)
          this.selectedSubCategory = this.subCategory.id
          this.isLoading = false;
          this.images = []
          this.item.images.forEach(image => {
            this.images.push({
              url: null,
              file: null,
              link: image
            })
          })
        }, err => {
          this.isLoading = false;
        })
      }
    }, err => {
      this.isLoading = false;
    })
    this.categoryApi.search({ status: 'active' }).subscribe(page => {
      this.categories = page.items
    }, err => {
      this.isLoading = false;
    })
    this.subCategoryApi.search({ status: 'active' }).subscribe(page => {
      this.subCategories = page.items
    }, err => {
      this.isLoading = false;
    })
  }

  ngOnInit() {
  }

  back() {
    this.uxService.back()
  }

  getSubCategories() {
    if (this.item.category) {
      this.subCategoryApi.search({status: 'active', category: this.item.category.id }).subscribe(page => {
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
    if (!this.selectedCategory) {
      this.uxService.handleError("Category is Required")
      return
    } else {
      this.item.category = new Category({ id: this.selectedCategory })
    }
    if (this.subCategories && this.subCategories.length && !this.selectedSubCategory) {
      this.uxService.handleError("Sub Category is Required")
      return
    } else {
      this.item.subCategory = new SubCategory({ id: this.selectedSubCategory })
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
      actualPrice: this.item.option.options[0].actualPrice,
      availability: this.item.option.options[0].availability,
      code: this.item.option.options[0].code,
    }
    this.item.tags = []
    for (const tag of this.tags) {
      this.item.tags.push(tag.label)
    }
    this.isLoading = true
    let hasFile = false
    for (const image of this.images) {
      if (image.file) {
        hasFile = true
      }
    }
    if (hasFile) {
      this.upload().subscribe(value => {
        if (value) {
          this.item.pic = this.images[0].link
          this.item.images = []
          for (const image of this.images) {
            this.item.images.push(image.link)
          }
          this.api.update(this.item.id, this.item).subscribe(item => {
            this.isLoading = false;
            this.uxService.showInfo("Item Updated")
            this.router.navigate(["view-items"])
          }, err => {
            this.isLoading = false;
          })
        } else {
          this.isLoading = false;
        }
      }, err => {
        this.isLoading = false;
      })
    } else {
      this.item.pic = this.images[0].link
      this.item.images = []
      for (const image of this.images) {
        this.item.images.push(image.link)
      }
      this.api.update(this.item.id, this.item).subscribe(item => {
        this.isLoading = false;
        this.uxService.showInfo("Item Updated")
        this.router.navigate(["view-items"])
      }, err => {
        this.isLoading = false;
      })
    }
  }

  addTags() {
    this.tags = this.tags || []
    this.tags.push({ label: "" })
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
      code: null,
      availability: null
    })
  }

  addOptionals() {
    this.item.optionals = this.item.optionals || []
    this.item.optionals.push({
      label: null,
      price: null,
      actualPrice: null,
      code: null
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
    this.tags.splice(index, 1)
  }

  unSelectOptional(index) {
    this.item.optionals.splice(index, 1)
  }

  upload(): Observable<boolean> {
    let totalUploads = 0
    let uploader = new Subject<boolean>()
    for (const image of this.images) {
      if (image.link && !image.file) {
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
