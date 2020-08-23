export class Category {

    id: string;
    code: string;
    name: string;
    pic: string;
    status: string;

    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.id = obj.id;
        this.code = obj.code;
        this.name = obj.name;
        this.pic = obj.pic;
        this.status = obj.status;
    }
}

