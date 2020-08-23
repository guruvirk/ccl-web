import { User } from './user.model';
import { Order } from './order';

export class Transaction {

  id: string;
  label: string;
  date: Date;
  type: string;
  status: string;
  amount: number;
  transactionId: string;
  user: User;
  method: string;
  order: Order;

  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.amount = obj.amount;
    this.label = obj.label;
    this.date = obj.date ? new Date(obj.date) : null;
    this.type = obj.type;
    this.status = obj.status;
    this.user = new User(obj.user);
    this.order = obj.order ? new Order(obj.order) : null;
    this.transactionId = obj.transactionId;
    this.method = obj.method;

  }
}
