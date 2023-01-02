export interface Category {
    checked?: boolean;
    _id: string;
    name: string;
    icon: string;
    color: string;
}

export interface CategoriesResponse {
    message: Category[];
    total: number;
}