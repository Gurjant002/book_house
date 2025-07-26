"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import HeaderPanel from "../components/header_panel";
import { useUser } from "@/context/UserContext";
import { getOwnedBooks } from "@/api/book";

import { OwnBooks } from "@/models/book";

export default function Profile() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, tokenData } = useUser();
  const [ownedBooks, setOwnedBooks] = useState<OwnBooks[]>([]);

  // Protección de ruta: si no está autenticado, redirigir al login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    } else {
      // Si está autenticado, podrías cargar los libros del usuario aquí
      if (tokenData) {
        getOwnedBooks(tokenData.payload.sub).then(books => {
          setOwnedBooks(books);
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
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800 text-white px-4">
          <div className="text-center text-2xl font-semibold">Cargando perfil...</div>
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
      <main className="flex min-h-screen flex-col items-center justify-center cus-dark-bg text-white px-4">
        <div>
          <h1 className="text-2xl text-center font-semibold">Welcome {user.first_name} {user.last_name}</h1>
        </div>

        <div className="my-5 mx-auto flex flex-col md:flex-row gap-4">
          <div>
            <div>
              <h1 className="text-xl font-semibold">Readed Books</h1>
            </div>
            <div>

            </div>
          </div>
          <div>
            <div>
              <h1 className="text-xl font-semibold">Owned Books</h1>
            </div>
            <div>
              {ownedBooks.length > 0 ? (
                <ul className="list-none pl-5">
                  <li className="text-lg py-3 px-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Title</span>
                      <span className="ml-2">Author</span>
                      <span className="ml-2">Year</span>
                    </div>
                  </li>
                  {ownedBooks.map((book) => (
                    <li key={book.id} className="text-lg py-5 px-3 cus-purple-bg mt-5">
                      <div className="flex justify-between">
                        <span className="font-semibold">{book.title}</span>
                        <span className="ml-2">{book.author}</span>
                        <span className="ml-2">{book.published_year}</span>
                      </div>
                    </li>
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