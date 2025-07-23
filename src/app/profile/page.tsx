"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import HeaderPanel from "../components/header_panel";
import { useUser } from "@/context/UserContext";

export default function Profile() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useUser();

  // Protección de ruta: si no está autenticado, redirigir al login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostrar loading mientras se cargan los datos
  if (isLoading) {
    return (
      <>
        <HeaderPanel />
        <main className="p-5">
          <div className="text-center">Cargando perfil...</div>
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
      <main className="p-5">
        <div>
          <h1>Welcome {user.first_name} {user.last_name}</h1>
        </div>
        <div>
          <div>
            <h1>Readed Books</h1>
          </div>
          <div>
            <h1>Owned Books</h1>
          </div>
        </div>
      </main>
    </>
  );
}