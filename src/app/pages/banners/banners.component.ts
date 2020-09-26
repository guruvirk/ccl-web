import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';
import { Tenant } from 'src/app/models';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  tenant: Tenant
  images: { url: string | ArrayBuffer, file: File, link: string, text: string }[]

  constructor(
    private auth: RoleService,
    private router: Router,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.tenant = this.auth.currentTenant()
    this.images = []
    if (this.tenant.banners && this.tenant.banners.length) {
      for (const banner of this.tenant.banners) {
        this.images.push({
          link: banner.url,
          text: banner.text,
          url: null,
          file: null
        })
      }
    }
  }

  ngOnInit() {
  }

  back() {
    this.uxService.back()
  }

  create() {
    this.upload().subscribe(value => {
      if (value) {
        this.tenant.banners = []
        for (const image of this.images) {
          this.tenant.banners.push({
            url: image.link,
            text: image.text
          })
        }
        this.auth.updateTenant(this.tenant).subscribe(item => {
          this.isLoading = false;
          this.uxService.showInfo("Updated Succesfully")
          this.router.navigate([""])
        }, err => {
          this.isLoading = false;
        })
      }
    })

  }

  addImages() {
    this.images = this.images || []
    this.images.push({
      url: null,
      file: null,
      link: null,
      text: null
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
