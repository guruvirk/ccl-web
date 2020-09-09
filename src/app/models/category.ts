export class Category {

    id: string;
    code: string;
    name: string;
    pic: string;
    status: string;
    order: number;
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
        this.order = obj.order;
        this.pic = obj.pic;
        this.status = obj.status;
        if (obj.filters && obj.filters.length) {
            this.filters = []
            for (const filter of obj.filters) {
                if (filter.label) {
                    this.filters.push({
                        label: filter.label,
                        isSelected: false
                    })
                } else {
                    this.filters.push({
                        label: filter,
                        isSelected: false
                    })
                }
            }
        }
    }
}

