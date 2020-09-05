import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';
import { Order } from '../models/order';
import { Page } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _api: GenericService<Order>;
  private _upload: GenericService<String>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
    this._upload = new GenericService(this.http, this.roleService, this.uxService);
  }

  create(order: Order): Observable<Order> {
    return this._api.create('orders', order)
  }

  update(id: string, order): Observable<Order> {
    return this._api.update(`orders/${id}`, order)
  }

  review(id: string, model): Observable<Order> {
    return this._api.update(`orders/review/${id}`, model)
  }

  get(id): Observable<Order> {
    return this._api.get(`orders/${id}`)
  }

  remove(order: Order): Observable<Order> {
    return this._api.delete(`orders/${order.id}`)
  }

  search(query): Observable<Page<Order>> {
    return this._api.search(`orders`, query)
  }

  upload(file: File): Observable<String> {
    return this._upload.upload(`upload`, file)
  }

}
