import { isTokenExpired, logout } from "./AuthService";
import { Usuario, NewUsuario } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// -------------------------
// FUNCION GENÉRICA
// -------------------------
async function fetchWithAuth<T>(
  token: string,
  url: string,
  options: RequestInit = {}
): Promise<T> {
  if (!token || isTokenExpired(token)) {
    logout();
    alert("Sesión Expirada, Inicie nuevamente");
    throw new Error("Sesión expirada");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw errorData || new Error(`Error HTTP: ${response.status}`);
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

// -------------------
// GET: Traer usuarios
// -------------------
export function getUsuarios(token: string) {
  return fetchWithAuth<Usuario[]>(token, `${API_BASE_URL}/usuario`, {
    method: "GET",
  });
}

// -------------------
// POST: Crear usuario
// -------------------
export function createUsuario(token: string, usuario: NewUsuario) {
  return fetchWithAuth<Usuario>(token, `${API_BASE_URL}/usuario`, {
    method: "POST",
    body: JSON.stringify(usuario),
  });
}

// -----------------------
// PUT: Actualizar usuario
// -----------------------
export function updateUsuario(token: string, usuario: Usuario) {
  return fetchWithAuth<Usuario>(
    token,
    `${API_BASE_URL}/usuario/${usuario.idUsuario}`,
    {
      method: "PUT",
      body: JSON.stringify(usuario),
    }
  );
}

// -------------------------
// DELETE: Eliminar usuario
// -------------------------
export function deleteUsuario(token: string, id: number) {
  return fetchWithAuth<boolean>(token, `${API_BASE_URL}/usuario/${id}`, {
    method: "DELETE",
  });
}
