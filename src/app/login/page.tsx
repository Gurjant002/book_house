"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import HeaderPanel from "../components/header_panel";
import { LoginUser } from "@/models/user";
import { loginUser } from "@/api/user";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<LoginUser>({
    username: "",
    password: "",
  });
  
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useUser();

  // Si ya está autenticado, redirigir
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const formData = new URLSearchParams();
    formData.append("username", user.username? user.username : "");
    formData.append("password", user.password);
    
    try {
      const response = await loginUser(formData);
      if (response) {
        // Usar el método login del Context
        await login(response);
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <HeaderPanel />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="bg-white dark:text-gray-800 p-8 rounded-lg shadow-lg w-80">
          <div>
            <h2 className="text-2xl font-bold">Login</h2>
          </div>
          {error && 
            <div className="bg-red-200 mt-4 text-red-700 text-sm mb-4 p-2 rounded-2xl">
              {error}
            </div>
          }
          {/* <form className="mt-4" action="/api/login" method="POST"> */}
          <div className="mt-4">
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                username
              </label>
              <input
                type="username"
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="Username or Email"
                value={user.username}
                required={true}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                // required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                required={true}
                value={user.password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                // required
              />
            </div>
            <button
              // type="submit"
              onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
