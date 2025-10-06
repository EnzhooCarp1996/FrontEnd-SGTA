import { isTokenExpired, logout } from "./AuthService";
import { PartesVehiculo } from "../types/PartesVehiculo";

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

// -------------------------
// GET: Traer partes del vehículo
// -------------------------
export function getPartesVehiculo(token: string) {
  return fetchWithAuth<PartesVehiculo[]>(token, `${API_BASE_URL}/partesvehiculo`, {
    method: "GET",
  });
}
