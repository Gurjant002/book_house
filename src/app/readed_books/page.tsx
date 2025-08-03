'use client';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import { useUser } from '@/context/UserContext';
import HeaderPanel from "../components/header_panel";


export default function ReadedBooksPage() {
  const { user, isAuthenticated, isLoading, tokenData } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    } else {
      // Si está autenticado, podrías cargar los libros del usuario aquí
      if (tokenData) {
        
      }
    }
    
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <>
        <HeaderPanel />
        <main className="flex min-h-screen flex-col items-center justify-center cus-dark-bg text-white px-4">
          <div className="text-center text-2xl font-semibold">Authenticating...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <HeaderPanel />
      <main className="flex min-h-screen flex-col items-center justify-center cus-dark-bg text-white px-4">
        <div className="text-center text-2xl font-semibold">Cargando libros leídos...</div>
      </main>
    </>
  )
}