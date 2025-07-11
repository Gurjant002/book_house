import { LoginUser, RegisterUser } from "@/models/user";
import { Token } from "@/models/token";

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

export async function loginUser(form: URLSearchParams): Promise<Token> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',

    },
    body: form.toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to login user");
  }

  const data: Token = await response.json();
  return data;
}

export async function validateToken(token: string): Promise<boolean> {
  const response = await fetch(`${API_URL}/validate_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to validate token");
  }

  const data = await response.json();
  return data.is_valid;
}
