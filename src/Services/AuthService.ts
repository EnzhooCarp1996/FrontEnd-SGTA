import { jwtDecode } from "jwt-decode";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Tipos JWT
export interface JwtPayload {
  sub: string;
  exp: number;
  role?: string | string[];
  [key: string]: unknown;
}

// Tipos respuesta login
export interface LoginResponse {
  token: string;
  refreshToken?: string;
  mensaje?: string;
}

// -------------------------
// LOGOUT
// -------------------------
export function logout(setToken?: (token: string | null) => void): void {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");

  if (setToken) {
    setToken(null);
  }
}

// -------------------------
// LOGIN
// -------------------------
export async function login(
  nombreUsuario: string,
  contrasenia: string
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombreUsuario, contrasenia }),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as {
      mensaje?: string;
    };
    throw new Error(errorData.mensaje || "Credenciales inválidas");
  }

  const data = (await response.json()) as LoginResponse;

  localStorage.setItem("token", data.token);
  if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);

  return data;
}

// -------------------------
// OBTENER TOKEN
// -------------------------
export function getToken(): string | null {
  return localStorage.getItem("token");
}

// -------------------------
// VALIDAR EXPIRACIÓN
// -------------------------
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

// -------------------------
// USUARIO ACTUAL
// -------------------------
export function getCurrentUser(): JwtPayload | null {
  const token = getToken();
  if (!token || isTokenExpired(token)) return null;
  return jwtDecode<JwtPayload>(token);
}

// -------------------------
// FETCH CON AUTH
// -------------------------
export async function getWithAuth<T>(
  url: string,
  setToken?: (token: string | null) => void
): Promise<T> {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    logout(setToken);
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    logout(setToken);
    throw new Error("No autorizado");
  }

  return (await response.json()) as T;
}

export async function postWithAuth<T, B = unknown>(
  url: string,
  body: B,
  setToken?: (token: string | null) => void
): Promise<T> {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    logout(setToken);
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    logout(setToken);
    throw new Error("No autorizado");
  }

  return (await response.json()) as T;
}
