import { User } from './user.model';
import { Order } from './order';
import { Address } from '.';

export class Tracking {

  id: string;
  date: Date;
  type: string;
  status: string;
  estimate: Date;
  trackingId: string;
  user: User;
  order: Order;
  address: Address;
  updates: [{
    label: string,
    date: Date
  }]

  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.date = obj.date ? new Date(obj.date) : null;
    this.type = obj.type;
    this.status = obj.status;
    this.user = new User(obj.user);
    this.order = obj.order ? new Order(obj.order) : null;
    this.trackingId = obj.trackingId;
    this.estimate = obj.estimate;
    this.address = new Address(obj.address || {})

    if (obj.updates && obj.updates.length) {
      for (const update of obj.updates) {
        if (this.updates && this.updates.length) {
          this.updates.push({
            label: update.label,
            date: update.date ? new Date(update.date) : null
          })
        } else {
          this.updates = [{
            label: update.label,
            date: update.date ? new Date(update.date) : null
          }]
        }
      }
    }

  }
}
