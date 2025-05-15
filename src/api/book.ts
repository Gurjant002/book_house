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
