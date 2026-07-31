import api from "./api";

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    full_name: string;
    email: string;
  };
}

export async function signup(data: {
  full_name: string;
  email: string;
  password: string;
}) {
  const response = await api.post<AuthResponse>(
    "/auth/signup",
    data
  );

  return response.data;
}

export async function login(data: {
  email: string;
  password: string;
}) {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data
  );

  return response.data;
}

export function saveAuth(auth: AuthResponse) {
  localStorage.setItem("token", auth.access_token);
  localStorage.setItem("user", JSON.stringify(auth.user));
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
}

export function isAuthenticated() {
  return !!getToken();
}