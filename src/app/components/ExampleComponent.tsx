// Ejemplo de cómo usar el UserContext en cualquier componente
"use client";
import { useUser } from "@/context/UserContext";

export default function ExampleComponent() {
  // ¡Mira qué fácil! Solo una línea para acceder a TODOS los datos del usuario
  const { user, isAuthenticated, isLoading, logout } = useUser();

  // Mostrar loading si está cargando
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // Si no está autenticado, mostrar mensaje
  if (!isAuthenticated) {
    return <div>Por favor, inicia sesión</div>;
  }

  // Si está autenticado, usar los datos del usuario
  return (
    <div>
      <h1>¡Hola, {user?.username}!</h1>
      <p>Email: {user?.email}</p>
      <p>Nombre completo: {user?.first_name} {user?.last_name}</p>
      
      <button onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}

// ¡Y ya está! No más:
// - useEffect para obtener el token
// - useState para manejar estados de carga
// - Validaciones repetitivas
// - Lógica duplicada
// 
// El Context maneja TODO por ti. ¡Qué concepto tan revolucionario! 🙄
