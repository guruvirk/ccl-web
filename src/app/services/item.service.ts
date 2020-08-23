import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';
import { Item } from '../models/item';
import { Page } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private _api: GenericService<Item>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
  }

  create(item: Item): Observable<Item> {
    return this._api.create('items', item)
  }
  update(item: Item): Observable<Item> {
    return this._api.update('items', item)
  }
  get(id): Observable<Item> {
    return this._api.get(`items/${id}`)
  }
  search(query): Observable<Page<Item>> {
    return this._api.search('items', query)
  }
  remove(item: Item): Observable<Item> {
    return this._api.delete(`items/${item.id}`)
  }

}
