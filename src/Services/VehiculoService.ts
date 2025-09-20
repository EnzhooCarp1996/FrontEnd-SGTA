import { isTokenExpired, logout } from "./AuthService";
import { Vehiculo, NewVehiculo } from "../types";

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
// GET: Traer vehículos
// -------------------------
export function getVehiculos(token: string) {
  return fetchWithAuth<Vehiculo[]>(token, `${API_BASE_URL}/vehiculo`, {
    method: "GET",
  });
}

// -------------------------
// POST: Crear vehículo
// -------------------------
export function createVehiculo(token: string, vehiculo: NewVehiculo) {
  return fetchWithAuth<Vehiculo>(token, `${API_BASE_URL}/vehiculo`, {
    method: "POST",
    body: JSON.stringify(vehiculo),
  });
}

// -------------------------
// PUT: Actualizar vehículo
// -------------------------
export function updateVehiculo(token: string, vehiculo: Vehiculo) {
  return fetchWithAuth<Vehiculo>(
    token,
    `${API_BASE_URL}/vehiculo/${vehiculo.idVehiculo}`,
    {
      method: "PUT",
      body: JSON.stringify(vehiculo),
    }
  );
}

// -------------------------
// DELETE: Eliminar vehículo
// -------------------------
export function deleteVehiculo(token: string, id: number) {
  return fetchWithAuth<boolean>(token, `${API_BASE_URL}/vehiculo/${id}`, {
    method: "DELETE",
  });
}
