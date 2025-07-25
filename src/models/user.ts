import { Book } from "./book";
export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    is_active?: boolean;
    is_superuser?: boolean;
    is_verified?: boolean;
    date_joined?: string;
    birth_date?: string; // Optional field for date of birth
}

export interface NonSensitiveUser {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: string;
    birth_date: string; // Optional field for date of birth
}

export interface RegisterUser extends User {
    confirm_password: string;
    confirm_email: string;
}

export interface LoginUser {
    username?: string;
    password: string;
}

export interface UserBooks extends NonSensitiveUser {
    readed_books: number[];
    rented_books: number[];
}
