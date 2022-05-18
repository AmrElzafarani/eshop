import { Category } from "./category";

export interface Product {
    _id: string;
    name: string;
    description?: string;
    richDescription?: string;
    brand?: string;
    image?: string;
    images: string[];
    price: number;
    category?: Category;
    countInStock?: number;
    rating?: number;
    isFeatured?: boolean;
    dataCreated?: string;
    numReviews?: number;


}