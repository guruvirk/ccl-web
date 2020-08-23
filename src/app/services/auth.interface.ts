import { User } from '../models';
import { Tenant } from '../models/tenant.model';

export interface IAuth {
  currentUser(): User;
  currentTenant(): Tenant;
  // currentSession(): Session;
  hasPermission(permissions: string | string[]): boolean;
}
