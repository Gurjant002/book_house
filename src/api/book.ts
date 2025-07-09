import {Book} from '../models/book';
export async function getHelloFromBooks() {
  const res = await fetch('http://localhost:8000/api/books/hello');
  const data = await res.json();
  return data;
}

export async function getBooks() {
  const res = await fetch('http://localhost:8000/api/books/get-all-books', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

export async function saveBook(book: Book[]) {
  const res = await fetch('http://localhost:8000/api/books/add-books', {
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
