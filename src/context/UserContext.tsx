"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { validateToken } from "@/api/token";
import { getUserByEmail } from "@/api/user";
import { Token, ValidatedToken } from "@/models/token";
import { NonSensitiveUser } from "@/models/user";
import { useRouter } from "next/navigation";

// Tipos para nuestro Context (porque TypeScript nos obliga a ser organizados)
interface UserContextType {
  user: NonSensitiveUser | null;
  tokenData: ValidatedToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: Token) => Promise<void>;
  logout: () => void;
}

// Creamos el Context con un valor por defecto que nunca se usará
// (pero TypeScript nos exige que lo pongamos 🙄)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
// Porque aparentemente necesitamos un hook para usar un hook 🤦‍♂️
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de un UserProvider. ¡Sorpresa!");
  }
  return context;
};

// Provider que envuelve tu app y comparte los datos del usuario
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<NonSensitiveUser | null>(null);
  const [tokenData, setTokenData] = useState<ValidatedToken | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Función para manejar el login
  const login = async (token: Token): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Guardamos el token en sessionStorage (porque las cookies son muy mainstream)
      sessionStorage.setItem("token", JSON.stringify(token));
      
      // Validamos el token
      const validatedTokenData = await validateToken(token.access_token);
      
      if (validatedTokenData.status === "valid") {
        setTokenData(validatedTokenData);
        
        // Obtenemos los datos del usuario
        const userData = await getUserByEmail(validatedTokenData.payload.sub);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        throw new Error("Token inválido");
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      clearAuthState(); // Si algo sale mal, limpiamos todo sin redireccionar
    } finally {
      setIsLoading(false);
    }
  };

  // Función para limpiar el estado sin redireccionar
  const clearAuthState = (): void => {
    sessionStorage.removeItem("token");
    setUser(null);
    setTokenData(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  // Función para manejar el logout
  const logout = (): void => {
    clearAuthState();
    router.push("/login");
  };

  // Efecto para verificar si ya hay un token guardado al cargar la app
  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        const storedToken = sessionStorage.getItem("token");
        
        if (!storedToken) {
          setIsLoading(false);
          return;
        }

        const token: Token = JSON.parse(storedToken);
        
        if (!token.access_token) {
          clearAuthState();
          return;
        }

        // Validamos el token existente
        const validatedTokenData = await validateToken(token.access_token);
        
        if (validatedTokenData.status === "valid") {
          setTokenData(validatedTokenData);
          
          // Obtenemos los datos del usuario
          const userData = await getUserByEmail(validatedTokenData.payload.sub);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          clearAuthState();
        }
      } catch (error) {
        console.error("Error inicializando autenticación:", error);
        clearAuthState();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // El valor que compartiremos con todos los componentes hijos
  const value: UserContextType = {
    user,
    tokenData,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
