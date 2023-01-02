export interface Brand {
    _id?: string;
    name: string;
}

export interface brandsResponse {
    message: Brand[];
    total: number;
}