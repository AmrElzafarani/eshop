import { Brand } from "./brand";
import { Category } from "./category";
import { Material } from "./material";
import { Supplier } from "./supplier";

export interface Product {
    _id: string;
    name: string;
    description?: string;
    richDescription?: string;
    brand?: Brand;
    image?: string;
    images: string[];
    price: number;
    category?: Category;
    material: Material;
    supplier?: Supplier
    countInStock?: number;
    rating?: number;
    isFeatured?: boolean;
    dataCreated?: string;
    numReviews?: number;
}

export interface ProductsResponse {
    message: Product[];
    total: number;
}