import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from '../services/role.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private auth: RoleService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.auth.currentUser();
    if (!currentUser) {
      return false
    }
    return this.rolePermissins(currentUser, next);
  }

  rolePermissins(user: User, next: ActivatedRouteSnapshot) {
    if (!user) {
      return false;
    }

    if (!next.data['permissions']) {
      return true;
    }

    const permissions = next.data['permissions'] as string[];

    const canAccess = this.auth.hasPermission(permissions);

    if (!canAccess) {
      console.error(`you don't have any of of the permission: ${permissions}`);
      return false;
    }

    return true;
  }

}
