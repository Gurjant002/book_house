"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { useState } from "react";

import { getUserProfile } from "@/api/user";
import { NonSensitiveUser } from "@/models/user";
import HeaderPanel from "../components/header_panel";
import { Token, ValidatedToken } from "@/models/token";
import { validateToken } from "@/api/token";

export default function Profile() {
  const [user, setUser] = useState<NonSensitiveUser | null>(null);
  const [token, setToken] = useState<ValidatedToken | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token: Token = JSON.parse(sessionStorage.getItem("token") || "{}");
    if (!token || !token.access_token) {
      router.push("/login");
      return;
    }
    getUserProfile(token.access_token)
        .then(setUser)
        .catch((error) => {
            console.error("Failed to fetch user:", error);
            setErrorMsg(error)
        });
  }, []);

  return (
    <>
      <HeaderPanel />
      <main className="p-5">
        {user ? (
          <>
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
          </>
        ) : (
          errorMsg ? (
            <p>Error: {errorMsg}</p>
          ) :
          (
            <p>Loading user data...</p>
          )
        )}
      </main>
    </>
  );
}