import { User } from './user.model';
import { Category } from './category';
import { SubCategory } from './sub-category';

export class Item {

    id: string;
    code: string;
    pic: string;
    thumbnail: string;
    images: string[];
    name: string;
    description: string;
    note: string;
    warranty: string;
    likes: User[]
    defaultOption: {
        label: string;
        price: number;
        actualPrice: number;
        code: string;
        type: string;
        availability: boolean;
    };
    option: {
        type: string,
        options: {
            label: string
            price: number
            actualPrice: number
            code: string
            availability: boolean
        }[]
    };
    optionals: {
        label: string
        price: number
        actualPrice: number
        code: string
    }[];
    tags: string[];
    status: string;
    meta: any;
    category: Category;
    subCategory: SubCategory;
    rating: {
        value: number,
        count: number,
        reviewCount: number,
        oneStar: number,
        twoStar: number,
        threeStar: number,
        fourStar: number,
        fiveStar: number
    }
    owner: User;
    isAvailable: boolean;

    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.id = obj.id;
        this.code = obj.code;
        this.name = obj.name;
        this.pic = obj.pic;
        this.status = obj.status;
        this.description = obj.description;
        this.warranty = obj.warranty;
        this.note = obj.note;
        this.status = obj.status;
        this.meta = obj.meta;
        this.thumbnail = obj.thumbnail;
        this.category = new Category(obj.category)
        this.subCategory = new SubCategory(obj.subCategory)
        this.owner = new User(obj.owner)
        this.isAvailable = false;
        this.option = {
            type: null,
            options: []
        }
        this.optionals = []
        if (obj.images && obj.images.length) {
            for (const image of obj.images) {
                if (this.images && this.images.length) {
                    this.images.push(image)
                } else {
                    this.images = [image]
                }
            }
        }

        if (obj.likes && obj.likes.length) {
            for (const like of obj.likes) {
                if (this.likes && this.likes.length) {
                    this.likes.push(new User(like))
                } else {
                    this.likes = [new User(like)]
                }
            }
        }

        if (obj.tags && obj.tags.length) {
            for (const tag of obj.tags) {
                if (this.tags && this.tags.length) {
                    this.tags.push(tag)
                } else {
                    this.tags = [tag]
                }
            }
        }

        if (obj.option && obj.option.options && obj.option.options.length) {
            for (const option of obj.option.options) {
                if (option.availability) {
                    this.isAvailable = true
                }
                if (this.option && this.option.options && this.option.options.length) {
                    this.option.options.push({
                        label: option.label,
                        price: option.price,
                        actualPrice: option.actualPrice,
                        code: option.code,
                        availability: option.availability
                    })
                } else {
                    this.option = {
                        type: obj.option.type,
                        options: [{
                            label: option.label,
                            price: option.price,
                            actualPrice: option.actualPrice,
                            code: option.code,
                            availability: option.availability
                        }]
                    }
                }
            }
        }

        if (obj.optionals && obj.optionals.length) {
            for (const option of obj.optionals) {
                if (this.optionals && this.optionals.length) {
                    this.optionals.push({
                        label: option.label,
                        price: option.price,
                        actualPrice: option.actualPrice,
                        code: option.code
                    })
                } else {
                    this.optionals = [{
                        label: option.label,
                        price: option.price,
                        actualPrice: option.actualPrice,
                        code: option.code
                    }]
                }
            }
        }

        if (obj.defaultOption) {
            this.defaultOption = {
                label: obj.defaultOption.label,
                price: obj.defaultOption.price,
                actualPrice: obj.defaultOption.actualPrice,
                code: obj.defaultOption.code,
                type: obj.defaultOption.type,
                availability: obj.defaultOption.availability
            }
            if (this.defaultOption.availability) {
                this.isAvailable = true
            }
        }

        if (obj.rating) {
            this.rating = {
                value: obj.rating.value,
                count: obj.rating.count,
                reviewCount: obj.rating.reviewCount,
                oneStar: obj.rating.oneStar,
                twoStar: obj.rating.twoStar,
                threeStar: obj.rating.threeStar,
                fourStar: obj.rating.fourStar,
                fiveStar: obj.rating.fiveStar
            }
        }
    }
}
