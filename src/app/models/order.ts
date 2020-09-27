import { User } from './user.model';
import { Transaction } from './transaction';
import { Item } from './item';
import { Tracking, Address } from '.';

export class Order {

  id: string;
  code: string;
  date: Date;
  user: User;
  estimate: Date;
  method: string;
  delivery: string;
  transaction: Transaction;
  tracking: Tracking;
  status: string;
  amount: number;
  address: Address;
  reviewDone: boolean;
  items: {
    item: Item,
    option: {
      label: string,
      price: number,
      actualPrice: number,
      basePrice: number,
      code: string,
      type: string,
    },
    quantity: number,
    baseOption: boolean
  }[];
  updates: {
    label: string,
    date: Date
  }[];
  lastUpdate: Date;

  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.date = obj.date ? new Date(obj.date) : null;
    this.code = obj.code;
    this.reviewDone = obj.reviewDone;
    this.status = obj.status;
    this.user = obj.user ? new User(obj.user) : null;
    this.tracking = obj.tracking ? new Tracking(obj.tracking) : null;
    this.transaction = obj.transaction ? new Transaction(obj.transaction) : null;
    this.amount = obj.amount;
    this.estimate = obj.estimate;
    this.lastUpdate = obj.lastUpdate;
    this.method = obj.method;
    this.delivery = obj.delivery;
    this.updates = []
    this.items = []
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

    if (obj.items && obj.items.length) {
      for (const item of obj.items) {
        if (this.items && this.items.length) {
          this.items.push({
            item: new Item(item.item),
            option: {
              label: item.option.label,
              price: item.option.price,
              actualPrice: item.option.actualPrice,
              basePrice: item.option.basePrice,
              code: item.option.code,
              type: item.option.type
            },
            baseOption: item.baseOption,
            quantity: item.quantity
          })
        } else {
          this.items = [{
            item: new Item(item.item),
            option: {
              label: item.option.label,
              price: item.option.price,
              actualPrice: item.option.actualPrice,
              basePrice: item.option.basePrice,
              code: item.option.code,
              type: item.option.type
            },
            baseOption: item.baseOption,
            quantity: item.quantity
          }]
        }
      }
    }

  }
}
