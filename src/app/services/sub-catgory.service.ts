import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';
import { SubCategory } from '../models/sub-category';
import { Page } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SubCatgoryService {

  private _api: GenericService<SubCategory>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
  }

  create(subCategory: SubCategory): Observable<SubCategory> {
    return this._api.create('subCategories', subCategory)
  }
  update(id: string, subCategory: SubCategory): Observable<SubCategory> {
    return this._api.update(`subCategories/${id}`, subCategory)
  }
  get(id): Observable<SubCategory> {
    return this._api.get(`subCategories/${id}`)
  }
  search(query): Observable<Page<SubCategory>> {
    return this._api.search('subCategories', query)
  }
  remove(subCategory: SubCategory): Observable<SubCategory> {
    return this._api.delete(`subCategories/${subCategory.id}`)
  }

}
