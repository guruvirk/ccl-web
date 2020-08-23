import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';
import { Category } from '../models/category';
import { Page } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CatgoryService {

  private _api: GenericService<Category>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
  }

  create(category: Category): Observable<Category> {
    return this._api.create('categories', category)
  }
  update(category: Category): Observable<Category> {
    return this._api.update('categories', category)
  }
  get(id): Observable<Category> {
    return this._api.get(`categories/${id}`)
  }
  search(query): Observable<Page<Category>> {
    return this._api.search('categories', query)
  }
  remove(category: Category): Observable<Category> {
    return this._api.delete(`categories/${category.id}`)
  }

}
