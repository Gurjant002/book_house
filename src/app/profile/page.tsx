"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import HeaderPanel from "../components/header_panel";
import { useUser } from "@/context/UserContext";
import { getOwnedBooks } from "@/api/book";

import { Book } from "@/models/book";
import { format } from "date-fns";

export default function Profile() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, tokenData } = useUser();
  const [ownedBooks, setOwnedBooks] = useState<Book[]>([]);
  const [ownedBooksLoading, setOwnedBooksLoading] = useState(true);

  // Protección de ruta: si no está autenticado, redirigir al login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    } else {
      // Si está autenticado, podrías cargar los libros del usuario aquí
      if (tokenData) {
        getOwnedBooks(tokenData.payload.sub).then(books => {
          setOwnedBooks(books);
          setOwnedBooksLoading(false);
        }).catch(err => {
          console.error("Error fetching owned books:", err);
        });
      }
    }
    
  }, [isAuthenticated, isLoading, router]);

  // Mostrar loading mientras se cargan los datos
  if (isLoading) {
    return (
      <>
        <HeaderPanel />
        <main className="flex min-h-screen flex-col items-center justify-center cus-dark-bg text-white px-4">
          <div className="text-center text-2xl font-semibold">Loading Profile...</div>
        </main>
      </>
    );
  }

  // Si no está autenticado, no mostrar nada (se redirigirá)
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <HeaderPanel />
      <main className="flex min-h-screen flex-col items-center cus-dark-bg text-white px-4">
        <div className="my-20">
          <h1 className="text-6xl text-center font-semibold">Welcome {user.first_name} {user.last_name}</h1>
        </div>

        <div className="my-5 mx-auto flex flex-row gap-10">
          <div>
            <div>
              <h1 className="text-xl font-semibold text-center">Borrowed Books</h1>
            </div>
            <div>
              {ownedBooks.length > 0 ? (
                <ul className="list-none px-5">
                  <li className="text-lg py-3 px-3">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <span className="font-semibold">Title</span>
                      <span className="text-center">Author</span>
                      <span className="text-center">Year</span>
                      <span className="text-center">Start Date</span>
                      <span className="text-center">End Date</span>
                    </div>
                  </li>
                  {ownedBooks.map((book) => (
                    <>
                      <hr className="my-2" />
                      <li key={book.id} className="text-lg py-5 px-3 cus-purple-bg rounded mt-3">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          <span className="font-semibold">{book.title}</span>
                          <span className="text-center">{book.author}</span>
                          <span className="text-center">{book.published_year}</span>
                          <span className="text-center">{book.date_added ? format(book.date_added, 'dd/MM/yyyy') : "Not Available"}</span>
                          <span className="text-center">{book.date_added ? format(book.date_added, 'dd/MM/yyyy') : "Not Available"}</span>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              ) : (
                <p className="text-lg text-center">No tienes libros propios.</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <h1 className="text-xl font-semibold text-center">Your Books</h1>
            </div>
            <div>
              {ownedBooksLoading ? (
                <p className="text-lg">Cargando libros...</p>
              ) : ownedBooks.length > 0 ? (
                <ul className="list-none px-5">
                  <li className="text-lg py-3 px-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <span className="font-semibold text-center">Title</span>
                      <span className="text-center">Author</span>
                      <span className="text-center">Year</span>
                      <span className="text-center">Date Added</span>
                    </div>
                  </li>
                  {ownedBooks.map((book) => (
                    <>
                      <hr className="my-2" />
                      <li key={book.id} className="text-lg py-5 px-3 cus-purple-bg rounded mt-3">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <span className="font-semibold text-center">{book.title}</span>
                          <span className="text-center">{book.author}</span>
                          <span className="text-center">{book.published_year}</span>
                          <span className="text-center">{book.date_added ? format(book.date_added, 'dd/MM/yyyy') : "Not Available"}</span>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              ) : (
                <p className="text-lg">No tienes libros propios.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}