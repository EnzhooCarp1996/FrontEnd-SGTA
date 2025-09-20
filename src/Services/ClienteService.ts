import { isTokenExpired, logout } from "./AuthService";
import { Cliente, NewCliente } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ---------------------------------
// Función genérica para requests
// ---------------------------------
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

  // Manejo cuando la respuesta puede estar vacía (ej: DELETE o PUT sin body)
  const text = await response.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

// -------------------------
// GET: Traer clientes
// -------------------------
export function getClientes(token: string) {
  return fetchWithAuth<Cliente[]>(token, `${API_BASE_URL}/cliente`, {
    method: "GET",
  });
}

// -------------------------
// POST: Crear cliente
// -------------------------
export function createCliente(token: string, cliente: NewCliente) {
  return fetchWithAuth<Cliente>(token, `${API_BASE_URL}/cliente`, {
    method: "POST",
    body: JSON.stringify(cliente),
  });
}

// -------------------------
// PUT: Actualizar cliente
// -------------------------
export function updateCliente(token: string, cliente: Cliente) {
  return fetchWithAuth<Cliente>(token, `${API_BASE_URL}/cliente/${cliente.idCliente}`, {
    method: "PUT",
    body: JSON.stringify(cliente),
  });
}

// -------------------------
// DELETE: Eliminar cliente
// -------------------------
export function deleteCliente(token: string, id: number) {
  return fetchWithAuth<boolean>(token, `${API_BASE_URL}/cliente/${id}`, {
    method: "DELETE",
  });
}
