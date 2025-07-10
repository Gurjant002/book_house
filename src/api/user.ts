import { RegisterUser } from "@/models/user";

const API_URL = 'http://localhost:8000/api/users';

export async function registerUser(user: RegisterUser) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  const data = await response.json();
  return data;
}