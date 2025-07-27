import { NonSensitiveUser } from "./user";

/**
 * Represents a book owned by a user in the system.
 *
 * @property id - Unique identifier for the book.
 * @property title - Title of the book.
 * @property author - Author of the book.
 * @property published_year - Year the book was published.
 * @property isbn - International Standard Book Number.
 * @property pages - Number of pages in the book.
 * @property cover - (Optional) URL or path to the book's cover image.
 * @property language - Language in which the book is written.
 * @property description - (Optional) Description or summary of the book.
 * @property available - Indicates if the book is currently available.
 * @property owner - The non-sensitive user information of the book's owner.
 * @property date_added - (Optional) Date when the book was added to the system.
 */
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
  owner?: NonSensitiveUser;
  date_added?: Date;
}

