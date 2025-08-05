"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/dist/client/components/navigation";

import { getBookById } from "@/api/book";
import HeaderPanel from "../components/header_panel";
import { Book } from "@/models/book";

export default function BookPage() {
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await getBookById(String(id));
        setBook(bookData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <>
      <HeaderPanel />
      <main className="min-h-screen mx-auto p-4 cus-dark-bg text-white">
        <div className="flex flex-col mx-auto">
          <div className="w-fit mx-auto">
            <h1 className="text-4xl font-bold mb-4">{book?.title}</h1>
          </div>
          <div className="gap-6 rounded-lg">
          
          <div className="flex flex-col md:px-52">
            <div className="mb-0">
              <p>
                <a href="/" className="underline">home</a> / {book?.title}
              </p>
            </div>
              {loading && <p>Loading...</p>}
              {error && !book && <p className="text-red-500">{error}</p>}
              {book && (
                <div className="flex flex-col md:flex-row bg-white text-black
                gap-5 p-6 rounded-lg shadow-md">
                  <div>
                    {book.cover && <img src={book.cover} alt={`${book.title} cover`} className="w-48 h-auto mb-4" />}
                  </div>
                  <div className="p-5">
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Published Year:</strong> {book.published_year}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Pages:</strong> {book.pages}</p>
                    <p><strong>Owner:</strong> {book.owner?.username}</p>
                    {book.description && <p><strong>Description:</strong> {book.description}</p>}
                    <div>
                      {book.available ? (
                        <button className="cus-light-blue-2-bg hv-cus-light-blue-btn transition-colors duration-300 text-white px-3 py-1 rounded cursor-pointer">
                          Borrow Book
                        </button>
                      ) : (
                        <button disabled className="bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed">
                          Not Available
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
          </div>
        </div>
      </main>
    </>
  );
}