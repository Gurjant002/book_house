"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import HeaderPanel from "../components/header_panel";
import Alertas from "../components/alertas";

import { saveBook } from "@/api/book";
import { Book } from "../../models/book";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const { user, isAuthenticated, isLoading } = useUser();
  const [error, setError] = useState<number | null>(null); // Para manejar errores
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState({
    title: "",
    author: "",
    published_year: 0,
    isbn: "",
    pages: 0,
    cover: undefined as File | undefined | string, // Aquí almacenaremos el archivo de imagen
    language: "",
    available: true, // Por defecto, el libro está disponible
    owner_id: user?.id,
  });

  const router = useRouter();


  // Protección de ruta: si no está autenticado, redirigir al login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleUploadCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Obtén el archivo seleccionado
    if (file) {
      setBook({
        ...book,
        cover: file, // Almacena el archivo en la propiedad cover
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!(book.title === "" || book.author === "" || book.published_year === 0 || book.isbn === "" || book.pages === 0)) {
      if (book.cover) {
        const reader = new FileReader();
        reader.onload = () => {
          const coverData = reader.result as string | ArrayBuffer;
          setBooks([...books, { ...book, cover: typeof coverData === 'string' ? coverData : undefined, owner_id: undefined }]);
        };
        if (book.cover instanceof File) {
          reader.readAsDataURL(book.cover);
        }
      } else {
        setBooks([...books, { ...book, cover: undefined, owner_id: undefined }]);
      }
      setBook({
        title: " ",
        author: " ",
        published_year: 0,
        isbn: " ",
        pages: 0,
        cover: undefined,
        language: " ",
        available: true, // Por defecto, el libro está disponible
        owner_id: user?.id,
      });
    }
  }

  const handleSave = async () => {
    if (books.length === 0) {
      console.error("No books to save");
      setError(404);
      return;
    }else {
      books.forEach(book => {
        book.owner_id = user?.id; // Aseguramos que el owner_id esté definido
        book.owner = user ? user : undefined; // Asignamos el usuario actual como propietario
        book.date_added = new Date(); // Agregamos la fecha de adición
      })
      const response = await saveBook(books);
      if (!response) {
        console.error("Failed to save books");
        setError(404);
        return;
      }else if (response.error) {
        console.error("Error saving books:", response.error);
        setError(404);
        return;
      }else if (response.success) {
        console.log("Books saved successfully:", response.data);
        setBooks([]); // Limpiar la lista de libros después de guardar
        setError(null); // Resetear el error
        return;
      }else if (response === null) {
        console.error("No response from server");
        setError(404);
        return;
      }
    }
    /* try {
      const response = await fetch("/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(books),
      });

      if (!response.ok) {
        throw new Error("Failed to save books");
      }

      const data = await response.json();
      console.log("Books saved successfully:", data);
      setBooks([]);
    } catch (error) {
      console.error("Error saving books:", error);
      setError(404)
    } */
  }

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <>
      <HeaderPanel />
      <main className="min-h-screen items-center justify-center bg-gray-800 py-5 ">
        <div className="grid grid-rows-1 w-fit md:grid-rows-2 md:w-1/2 mx-auto ">
          <div className="bg-white dark:bg-gray-600 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Add New Books</h2>
            {/* <form className="mt-4" action="/api/login" method="POST"> */}
            <form className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-5" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  // required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  // required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="published_year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Published Year
                </label>
                <input
                  type="number" placeholder="YYYY" min="0001" max={year}
                  id="published_year"
                  name="published_year"
                  value={book.published_year}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  // required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="isbn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  ISBN
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={book.isbn}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  // required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="pages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Number of Pages
                </label>
                <input
                  type="number"
                  id="pages"
                  name="pages"
                  value={book.pages}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  // required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="cover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Cover
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="cover"
                  name="cover"
                  onChange={handleUploadCover}
                  className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  // required
                />
              </div>
              <div className="text-white">
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                  // onClick={() => {router.push("/login")}}
                  >Add
                </button>
              </div>
            </form>
            {
              books.length > 0 ? (
                <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                  <div className="text-white">
                    <button 
                      className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
                      onClick={() => {handleSave()}}
                      >Submit
                    </button>
                  </div>
                  <div className="text-white">
                    <button 
                      className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
                      onClick={() => {setBooks([])}}
                      >Clean
                    </button>
                  </div>
                </div>
              ):
              null
              /* ? (
                <p className="text-gray-500 mt-4">No books added yet.</p>
              ) : (
                <p className="text-gray-500 mt-4">Books added successfully!</p>
              ) */
            }
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 m-auto mt-5">
            {books.map((book, index) => (
              <div key={index} className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">{book.title}</h3>
                <div>
                  <img
                    alt={book.title}
                    src={typeof book.cover === 'string' ? book.cover : undefined } // Asegúrate de que book.cover sea una URL o un Data URL
                    className="rounded-lg mb-4 max-h-64" />
                </div>
                <p className="text-gray-700 dark:text-gray-300">Author: {book.author}</p>
                <p className="text-gray-700 dark:text-gray-300">Published Year: {book.published_year}</p>
                <p className="text-gray-700 dark:text-gray-300">ISBN: {book.isbn}</p>
                <p className="text-gray-700 dark:text-gray-300">Pages: {book.pages}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Alertas error={error} />
    </>
  );
}
