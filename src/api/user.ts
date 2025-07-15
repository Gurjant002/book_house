import { User, NonSensitiveUser, LoginUser, RegisterUser } from "@/models/user";
import { Token, ValidatedToken } from "@/models/token";

const API_URL = 'http://localhost:8000/api/users';

export async function registerUser(user: RegisterUser) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = response;
  return data;
}

export async function getUserById(id: string): Promise<NonSensitiveUser> {
  const response = await fetch(`${API_URL}/get-user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data: NonSensitiveUser = await response.json();
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

export async function getUser(id: string): Promise<User> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data: User = await response.json();
  return data;
}

export async function getUserByEmail(email: string): Promise<NonSensitiveUser> {
  const response = await fetch(`${API_URL}/get-user-by-email?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data: NonSensitiveUser = await response.json();
  return data;
}
