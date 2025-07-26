"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

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
            <div className="flex space-x-2">
              <button 
                onClick={() => {router.push("/add_book")}}
                className="px-4 py-2 cus-purple-bg text-white rounded cursor-pointer"
                >Add book</button>
              <button 
                className="px-4 py-2 cus-purple-bg text-white rounded cursor-pointer"
                >Readed books</button>
              {/* <button className="px-4 py-2 cus-purple-bg text-white rounded cursor-pointer">Button 3</button> */}
            </div>
            <div className="m-auto">
              <h1 className="cus-purple-text text-4xl font-bold cursor-pointer" onClick={(() => {router.push('/')})}>G-BOOKS</h1>
            </div>
            <div className="text-white ml-auto mr-0 flex flex-row gap-2 items-center">
              {/* PERFIL DEL USUARIO */}
              <div className="">
                {/* <button 
                  className="px-4 py-2 cus-purple-bg text-white rounded cursor-pointer"
                  onClick={() => {router.push("/profile")}}
                  >Profile
                </button> */}
                <a href={`/profile`} className="px-4 py-2 cus-purple-bg text-white rounded cursor-pointer">{user?.username}</a>
              </div>
              <div>
                <button 
                  className="px-4 py-2 cus-purple-bg text-white rounded cursor-pointer"
                  onClick={logoutHandler}>
                  Logout
                </button>
              </div>
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
              <h1 className="cus-purple-text text-4xl font-bold cursor-pointer" onClick={(() => {router.push('/')})}>G-BOOKS</h1>
            </div>
            <div className="text-white ml-auto mr-0 flex flex-row gap-2">
              <div>
                <button 
                  className="px-4 py-2 cus-purple-bg text-white rounded cursor-pointer"
                  onClick={() => {router.push("/login")}}
                  >Login</button>
              </div>
              <div>
                <button 
                  className="px-4 py-2 cus-purple-bg text-white rounded cursor-pointer"
                  onClick={() => {router.push("/register")}}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  )
}