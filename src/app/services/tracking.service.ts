import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction, Tracking, Page } from '../models';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private _api: GenericService<Tracking>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
  }

  create(tracking: Tracking): Observable<Tracking> {
    return this._api.create('trackings', tracking)
  }
  update(id: string, tracking): Observable<Tracking> {
    return this._api.update(`trackings/${id}`, tracking)
  }
  get(id): Observable<Tracking> {
    return this._api.get(`trackings/${id}`)
  }
  search(query): Observable<Page<Tracking>> {
    return this._api.search('trackings', query)
  }
  remove(tracking: Tracking): Observable<Tracking> {
    return this._api.delete(`trackings/${tracking.id}`)
  }

}
