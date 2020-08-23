import { Category } from './category';

export class SubCategory {

    id: string;
    code: string;
    name: string;
    pic: string;
    status: string;
    category: Category

    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.id = obj.id;
        this.code = obj.code;
        this.name = obj.name;
        this.pic = obj.pic;
        this.status = obj.status;
        this.category = new Category(obj.category)
    }
}

