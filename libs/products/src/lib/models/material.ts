export interface Material {
    _id?: string;
    name: string;
}

export interface materialsResponse {
    message: Material[];
    total: number;
}