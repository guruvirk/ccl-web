import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction, Page } from '../models';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private _api: GenericService<Transaction>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
  }

  create(transaction: Transaction): Observable<Transaction> {
    return this._api.create('transactions', transaction)
  }
  update(id, transaction): Observable<Transaction> {
    return this._api.update(`transactions/${id}`, transaction)
  }
  pay(id, meta): Observable<Transaction> {
    return this._api.update(`transactions/pay/${id}`, { meta: meta })
  }
  validate(meta): Observable<any> {
    return this._api.post(`transactions/validate`, meta)
  }
  get(id): Observable<Transaction> {
    return this._api.get(`transactions/${id}`)
  }
  remove(transaction: Transaction): Observable<Transaction> {
    return this._api.delete(`transactions/${transaction.id}`)
  }
  search(query): Observable<Page<Transaction>> {
    return this._api.search(`transactions`, query)
  }

}
