export class Tenant {
  
  id: string;
  code: string;
  name: string;
  phone: number;
  email: string;
  supportPhone: number;
  supportEmail: string;
  address: string;

  constructor(obj?: any) {

    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.code = obj.code;
    this.name = obj.name;
    this.phone = obj.phone;
    this.email = obj.email;
    this.supportPhone = obj.supportPhone;
    this.supportEmail = obj.supportEmail;
    this.address = obj.address;

  }
}
