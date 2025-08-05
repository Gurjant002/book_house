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

/**
 * Represents a user object with non-sensitive information.
 *
 * @property id - Unique identifier for the user.
 * @property username - The user's username.
 * @property email - The user's email address.
 * @property first_name - The user's first name.
 * @property last_name - The user's last name.
 * @property is_active - Indicates if the user's account is active.
 * @property date_joined - The date the user joined, in ISO string format.
 * @property birth_date - The user's date of birth (optional), in ISO string format.
 */
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
