export interface Book {
  title: string;
  author: string;
  published_year: number;
  isbn: string;
  pages: number;
  cover?: ArrayBuffer | string | null;
  language: string;
}