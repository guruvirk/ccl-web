export class Session {
  id: string;
  expiry: Date;

  constructor(obj?: any) {

    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.expiry = obj.expiry;

  }
}
