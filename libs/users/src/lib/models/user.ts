export interface User {
    _id: string;
    name: string;
    password?: string;
    email?: string;
    phone?: string;
    token?: string;
    isAdmin?: true;
    street?: string;
    apartment?: string;
    zip?: string;
    city?: string;
    country?: string;
}

export interface UsersResponse {
    message: User[];
    total: number;
}
