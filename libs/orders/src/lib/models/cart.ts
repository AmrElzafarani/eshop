import { CartItem } from "./cartItem";

export interface Cart {
    items : CartItem[]
}

export interface CartItemDetailed {
    product: any;
    quantity: number;
}