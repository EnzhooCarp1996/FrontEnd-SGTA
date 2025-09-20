import { isTokenExpired, logout } from "./AuthService";
import { Presupuesto, NewPresupuesto } from "../types";

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

// -----------------------
// GET: Traer presupuestos
// -----------------------
export function getPresupuestos(token: string) {
  return fetchWithAuth<Presupuesto[]>(token, `${API_BASE_URL}/presupuesto`, {
    method: "GET",
  });
}

// -----------------------
// POST: Crear presupuesto
// -----------------------
export function createPresupuesto(token: string, presupuesto: NewPresupuesto) {
  return fetchWithAuth<Presupuesto>(token, `${API_BASE_URL}/presupuesto`, {
    method: "POST",
    body: JSON.stringify(presupuesto),
  });
}

// ---------------------------
// PUT: Actualizar presupuesto
// ---------------------------
export function updatePresupuesto(token: string, presupuesto: Presupuesto) {
  return fetchWithAuth<Presupuesto>(
    token,
    `${API_BASE_URL}/presupuesto/${presupuesto.idPresupuesto}`,
    {
      method: "PUT",
      body: JSON.stringify(presupuesto),
    }
  );
}

// ----------------------------
// DELETE: Eliminar presupuesto
// ----------------------------
export function deletePresupuesto(token: string, id: number) {
  return fetchWithAuth<boolean>(token, `${API_BASE_URL}/presupuesto/${id}`, {
    method: "DELETE",
  });
}
