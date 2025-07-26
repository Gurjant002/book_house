export interface Book {
  id?: number;
  title: string;
  author: string;
  published_year: number;
  isbn: string;
  pages: number;
  cover?: string;
  language: string;
  description?: string;
  available: boolean;
  owner_id?: number;
  date_added?: Date;
}

export interface OwnBooks {
  id: number;
  title: string;
  author: string;
  published_year: number;
  isbn: string;
  pages: number;
  cover?: string;
  language: string;
  description?: string;
  available: boolean;
  owner_id?: number;
  date_added?: Date;
}
