import { Category } from './category';

export class SubCategory {

    id: string;
    code: string;
    name: string;
    pic: string;
    status: string;
    order: number;
    category: Category;
    filters: {
        isSelected: boolean,
        label: String
    }[]

    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.id = obj.id;
        this.code = obj.code;
        this.name = obj.name;
        this.pic = obj.pic;
        this.order = obj.order;
        this.status = obj.status;
        this.category = new Category(obj.category)
        if (obj.filters && obj.filters.length) {
            this.filters = []
            for (const filter of obj.filters) {
                this.filters.push({
                    label: filter,
                    isSelected: false
                })
            }
        }
    }
}

