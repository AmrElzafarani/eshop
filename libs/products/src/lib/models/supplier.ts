export interface Supplier {
    _id?: string;
    name: string;
    phone: string;
    address: string;
}

export interface SupplierResponse {
    message: Supplier[];
    total: number;
}