"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderPanel from "../components/header_panel";
import { Book } from "../../models/book";

export default function Login() {
  const [action, setAction] = useState<string | undefined>();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState({
    title: "",
    author: "",
    published_year: 0,
    isbn: "",
    pages: 0,
    cover: undefined as File | undefined, // Aquí almacenaremos el archivo de imagen
    language: "",
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      // If token exists, redirect to home page
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (action === "login") {
      // Perform login action
      console.log("Performing login action");
      router.push("/");
    }
  
  }, [action]);

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
          setBooks([...books, { ...book, cover: coverData }]);
        };
        reader.readAsDataURL(book.cover);
      } else {
        setBooks([...books, { ...book, cover: undefined }]);
      }
      setBook({
        title: " ",
        author: " ",
        published_year: 0,
        isbn: " ",
        pages: 0,
        cover: undefined,
        language: " "
      });
    }
  }

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <>
      <HeaderPanel />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-800 grid-rows-2">
        <div className="bg-white p-8 rounded-lg shadow-lg w-auto">
          <h2 className="text-2xl font-bold">Add New Books</h2>
          {/* <form className="mt-4" action="/api/login" method="POST"> */}
          <form className="mt-4 grid grid-cols-3 gap-5" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                // value={book.title}
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
                // value={book.author}
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
                type="number" placeholder="YYYY" min="1999" max={year}
                id="published_year"
                name="published_year"
                // value={book.published_year}
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
                // value={book.isbn}
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
                // value={book.pages}
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
                // value={book.cover}
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
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
          {books.map((book, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">{book.title}</h3>
              <img
                alt={book.title}
                src={book.cover}
                className="w-full h-auto rounded-lg mb-4" />
              <p className="text-gray-700">Author: {book.author}</p>
              <p className="text-gray-700">Published Year: {book.published_year}</p>
              <p className="text-gray-700">ISBN: {book.isbn}</p>
              <p className="text-gray-700">Pages: {book.pages}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
