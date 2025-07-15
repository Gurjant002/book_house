"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { useState } from "react";

import { getUserById } from "@/api/user";
import { NonSensitiveUser } from "@/models/user";
import HeaderPanel from "../components/header_panel";
import { ValidatedToken } from "@/models/token";

export default function Profile() {
  const [user, setUser] = useState<NonSensitiveUser | null>(null);
  const [token, setToken] = useState<ValidatedToken | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    

    if (id) {
      getUserById(id as string)
          .then(setUser)
          .catch((error) => {
              console.error("Failed to fetch user:", error);
          });
    }
  }, []);

  return (
    <>
      <HeaderPanel />
      <main>
        <h1>User Profile</h1>
        {user ? (
          <div>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <p><strong>Date Joined:</strong> {new Date(user.date_joined).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'})}</p>
            <p><strong>Birth Date:</strong> {user.birth_date ? new Date(user.birth_date).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'}) : "Not provided"}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </main>
    </>
  );
}