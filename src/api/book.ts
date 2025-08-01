import {Book} from '../models/book';
// export async function getHelloFromBooks() {
//   const res = await fetch('http://localhost:8000/api/books/hello');
//   const data = await res.json();
//   return data;
// }

const API_URL = 'http://localhost:8000/api/books';

export async function getBooks() {
  const res = await fetch(`${API_URL}/get-all-books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch books');
  }
  const data = await res.json();
  return data;
}

export async function getBookById(id: string) {
  const res = await fetch(`${API_URL}/get-book/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail || 'Failed to fetch book');

  }
  const data = await res.json();
  return data;
}

export async function saveBook(book: Book[]) {
  const res = await fetch(`${API_URL}/add-books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(book),
  });
  const data = await res.json();
  return data;
}

export async function getOwnedBooks(token: string) {
  const res = await fetch(`${API_URL}/owned-books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
  
}
