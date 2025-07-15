import { Token, ValidatedToken } from "@/models/token";

const API_URL = 'http://localhost:8000/api/users';

export async function validateToken(token: string): Promise<ValidatedToken> {
  const response = await fetch(`${API_URL}/tokenvalidate`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to validate token");
  }

  const data = await response.json();
  return data;
}


