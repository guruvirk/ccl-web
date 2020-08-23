export class Address {

    line1: string;
    line2: string;
    district: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;

    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.line1 = obj.line1;
        this.line2 = obj.line2;
        this.district = obj.district;
        this.city = obj.city;
        this.state = obj.state;
        this.pinCode = obj.pinCode;
        this.country = obj.country;
    }
}

