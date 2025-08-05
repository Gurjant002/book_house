"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/dist/client/link";

export default function HeaderPanel() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useUser();

  const logoutHandler = () => {
    logout(); // ¡Qué simple! El Context maneja todo
  };

  // Si está cargando, mostramos un loading (o no, tú decides)
  if (isLoading) {
    return (
      <header className="font-mono p-5 cus-dark-bg">
        <div className="text-center text-white">Cargando...</div>
      </header>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <header className="font-mono p-5 cus-dark-bg">
          <div className="grid grid-cols-1 gap-4 py-1 md:grid-cols-3 md:gap-0 lg:grid-cols-3 lg:gap-0 m-auto w-full">
            <div className="text-white mr-auto ml-0 flex flex-row gap-2 items-center space-x-2">
              <Link href="/add_book" className="px-4 py-2 cus-purple-bg text-white rounded">Add Book</Link>
              <Link href="/readed_books" className="px-4 py-2 cus-purple-bg text-white rounded">Readed Books</Link>
              {/* <button className="px-4 py-2 cus-purple-bg text-white rounded cursor-pointer">Button 3</button> */}
            </div>
            <div className="m-auto space-y-2">
              <Link href="/" className="font-bold text-4xl text-center cus-purple-text">G-BOOKS</Link>
              <p className="text-white text-1xl font-bold text-center">ਅੱਖਰਾਂ ਦੀ ਉਸਤਤ</p>
            </div>
            <div className="text-white ml-auto mr-0 flex flex-row gap-2 items-center space-x-2">
              {/* PERFIL DEL USUARIO */}
              <Link href={`/profile`} className="px-4 py-2 cus-purple-bg rounded cursor-pointer">{user?.username}</Link>
              <button 
                className="px-4 py-2 cus-purple-bg rounded cursor-pointer"
                onClick={logoutHandler}
                >Logout</button>
            </div>
          </div>

        </header>
      ) : (
        <header className="font-mono p-5 cus-dark-bg">
          <div className="grid grid-cols-1 gap-4 py-1 md:grid-cols-3 md:gap-0 lg:grid-cols-3 lg:gap-0 m-auto w-full">
            <div className="flex space-x-2">
              {/* SOBRE NOSOTROS */}
            </div>
            <div className="m-auto">
              <Link href="/" className="cus-purple-text text-4xl font-bold">G-BOOKS</Link>
              <p className="text-white text-1xl font-bold text-center">ਅੱਖਰਾਂ ਦੀ ਉਸਤਤ</p>
            </div>
            <div className="text-white ml-auto mr-0 flex flex-row gap-2 items-center space-x-2">
              <div>
                <Link href="/login" className="px-4 py-2 cus-purple-bg rounded">Login</Link>
              </div>
              <div>
                <Link href="/register" className="px-4 py-2 cus-purple-bg rounded">Register</Link>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  )
}