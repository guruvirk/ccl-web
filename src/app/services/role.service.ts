import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Item, Order } from '../models';
import { LocalStorageService } from './local-storage.service';
import { GenericService } from './generic.service';
import { IAuth } from './auth.interface';
import { Tenant } from '../models/tenant.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UxService } from './ux.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements IAuth {

  private _authApi: GenericService<any>;
  private _tenantApi: GenericService<Tenant>;
  private _user: User
  private _cart: Order;
  private _tenant: Tenant
  private _userSubject = new Subject<User>();
  private _cartSubject = new Subject<Order>();
  private _tenantSubject = new Subject<Tenant>();

  public tenantChanges = this._tenantSubject.asObservable();
  public userChanges = this._userSubject.asObservable();
  public cartChanges = this._cartSubject.asObservable();

  constructor(private localDb: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    private uxService: UxService) {
    this._authApi = new GenericService(this.http, this, this.uxService);
    this._tenantApi = new GenericService(this.http, this, this.uxService);
    this.setTenant()
    this.getCart()
  }

  loginWithEmail(email, password) {
    this._authApi.create('users/login', {
      email: email,
      password: password
    }).subscribe(user => {
      this._user = user;
      this.localDb.update('user', this._user);
      this._userSubject.next(this._user)
      this._tenant = user.tenant;
      this.localDb.update('tenant', this._tenant);
      this._tenantSubject.next(this._tenant)
      this.uxService.showInfo("Succefully Logged In")
      this.router.navigate([""])
    })
  }

  loginWithPhone(phone, password) {
    this._authApi.create('users/login', {
      phone: phone,
      password: password
    }).subscribe(user => {
      this._user = user;
      this.localDb.update('user', this._user);
      this._userSubject.next(this._user)
      this._tenant = user.tenant;
      this.localDb.update('tenant', this._tenant);
      this._tenantSubject.next(this._tenant)
      this.uxService.showInfo("Succefully Logged In")
      this.router.navigate([""])
    })
  }

  confirm(phone, otp) {
    this._authApi.create('users/confirm', { phone: phone, otp: otp }).subscribe(user => {
      this._user = user;
      this.localDb.update('user', this._user);
      this._userSubject.next(this._user)
      this._tenant = user.tenant;
      this.localDb.update('tenant', this._tenant);
      this._tenantSubject.next(this._tenant)
      this.uxService.showInfo("Registered Succefully")
      this.router.navigate([""])
    })
  }

  register(user): Observable<User> {
    return this._authApi.create('users', user)
  }

  updateCart(cart: Order) {
    this._cart = cart
    this.localDb.update("cart", this._cart)
    this._cartSubject.next(this._cart)
  }

  getCart(): Order {
    if (this._cart) {
      return this._cart;
    }

    const savedCart = this.localDb.get('cart');

    if (!savedCart) {
      this._cart = new Order({})
      this._cartSubject.next(this._cart)
      return this._cart;
    }

    this._cart = new Order(savedCart)
    this._cartSubject.next(this._cart)

    return this._cart;

  }

  getIndexInCart(item: Item) {
    let index = null
    let i = 0;
    this._cart.items.forEach(cartItem => {
      if (cartItem.item.id == item.id) {
        index = i;
      }
      i++
    })
    return index
  }

  addToCart(item: Item, option: {
    label: string,
    price: number;
    actualPrice: number;
    code: string;
    type: string;
  }, quantity) {
    let added = false
    if (this._cart.items && this._cart.items.length) {
      let index = this.getIndexInCart(item)
      if (index || index == 0) {
        added = true
        this._cart.amount = this._cart.amount - (this._cart.items[index].option.price * this._cart.items[index].quantity)

        this._cart.items[index].option = option

        this._cart.items[index].quantity = quantity

        this._cart.amount = this._cart.amount || 0

        this._cart.amount = this._cart.amount + (option.price * this._cart.items[index].quantity)

        this.localDb.update("cart", this._cart)
        this._cartSubject.next(this._cart)
      }
    }
    if (!added) {
      this._cart.items.push({
        item: item,
        option: option,
        quantity: quantity
      })

      this._cart.amount = this._cart.amount || 0

      this._cart.amount = this._cart.amount + option.price

      this.localDb.update("cart", this._cart)
      this._cartSubject.next(this._cart)
    }

  }

  removeFromCart(item: Item) {
    if (this._cart.items && this._cart.items.length) {
      let index = this.getIndexInCart(item)

      if (index || index == 0) {

        this._cart.amount = this._cart.amount - (this._cart.items[index].option.price * this._cart.items[index].quantity)

        this._cart.items.splice(index, 1);

        this.localDb.update("cart", this._cart)
        this._cartSubject.next(this._cart)

      }
    }
  }

  emptyCart() {
    if (this._cart.items && this._cart.items.length) {

      this._cart.amount = 0

      this._cart.items = []

      this.localDb.update("cart", this._cart)
      this._cartSubject.next(this._cart)

    }
  }

  getLocalUser(): User {
    if (this.localDb.get("localUser")) {
      return new User(this.localDb.get("localUser"))
    } else {
      this.localDb.update('localUser', new User({
        localKey: Math.random().toString(36).substring(7)
      }));
      return this.getLocalUser()
    }
  }

  changeCode(user, code): Observable<any> {
    return this._authApi.create('users/changeCode', { user: user, code: code })
  }

  sendOtp(phone): Observable<any> {
    return this._authApi.create('users/sendOtp', { phone: phone })
  }

  changePasswordWithOtp(phone, otp, password): Observable<any> {
    return this._authApi.create('users/changePasswordWithOtp', { user: { phone: phone }, otp: otp, password: password })
  }

  changePassword(user, password, newPassword): Observable<any> {
    return this._authApi.create('users/changePassword', { user: user, password: password, newPassword: newPassword })
  }

  codeExists(code: String): Boolean {
    let result = true
    this._authApi.get(`users/codeExists/${code}`).subscribe(response => {
      if (!response || response.exists == undefined) {
        result = true
      }
      result = !response.exists
    })
    return result
  }

  phoneExists(phone: number): Boolean {
    let result = true
    this._authApi.get(`users/phoneExists/${phone}`).subscribe(response => {
      if (!response || response.exists == undefined) {
        result = true
      }
      result = !response.exists
    })
    return result
  }

  currentTenant(): Tenant {
    if (this._tenant) {
      return this._tenant;
    }

    const savedTenant = this.localDb.get('tenant');

    if (!savedTenant) {
      return null
    }

    this._tenant = new Tenant(savedTenant)

    return this._tenant;

  }

  currentUser(): User {

    if (this._user && !this._user.session) {
      this._user = null
      return null
    }

    if (this._user) {
      return this._user;
    }

    const savedUser = this.localDb.get('user');

    if (!savedUser || !savedUser.session) {
      this._user = null
      return null
    }

    this._user = new User(savedUser)

    return this._user;
  }

  hasPermission(permissions: string | string[]): boolean {
    if (!permissions || Array.isArray(permissions) && !permissions.length) {
      return true;
    }

    const currentUser = this.currentUser();
    if (!currentUser) { return false; }

    if (!currentUser.permissions || !currentUser.permissions.length) { return false; }

    if (typeof permissions === 'string') {
      return !!currentUser.permissions.find((item) => item.toLowerCase() === permissions.toLowerCase());
    }

    for (const permission of permissions) {
      const value = currentUser.permissions.find((item) => item.toLowerCase() === permission.toLowerCase());
      if (value) {
        return true;
      }
    }

    return false;
  }

  setTenant() {

    const code = environment.tenant

    this._tenantApi.get('tenants/' + code).subscribe(tenant => {
      this.localDb.update('tenant', tenant);
      this._tenant = tenant
      this._tenantSubject.next(this._tenant)
    })

  }

  changeUser(user: User) {
    if (!user.session) {
      user.session = this._user.session
    }
    this.localDb.update('user', user);
    this._user = user
    this._userSubject.next(this._user)
  }

  refreshUser() {
    let user = this.currentUser()
    this._authApi.get(`users/my`).subscribe(item => {
      user.coins = item.coins
      user.permissions = item.permissions
      user.sellLimit = item.sellLimit
      this.localDb.update('user', user);
      this._user = user
      this._userSubject.next(this._user)
    })
  }

  logout() {
    this._authApi.get(`users/logout/${this._user.session.id}`).subscribe()
    const tenant = this.localDb.get('tenant');
    this.localDb.clear();
    this.localDb.update('tenant', tenant);
    this._userSubject.next(null);
    this._user = null;
    this.uxService.showInfo("Logged Out Succefully")
    this.router.navigate(["/"])
  }

}
