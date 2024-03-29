// import { User } from "@eshop/users";
import { OrderItem } from "./order-item";

export class Order {
    _id?: string;
    orderItems?: OrderItem[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: number;
    totalPrice?: string;
    user?: any;
    dateOrdered?: string;
}

export interface OrdersResponse {
    message: Order[];
    total: number;
}