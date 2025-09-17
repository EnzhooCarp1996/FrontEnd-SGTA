import { isTokenExpired, logout } from "./AuthService";
import toast from "react-hot-toast";
import { NewVehiculo, Vehiculo } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// -------------------------
// GET: Traer vehiculos
// -------------------------
export async function getVehiculos(token: string) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/vehiculo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo clientes:", error);
    throw error;
  }
}

// -------------------------
// POST: Crear vehiculo
// -------------------------
export async function createVehiculo(token: string, vehiculo: NewVehiculo) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/vehiculo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(vehiculo),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return (await response.json()) as Vehiculo;
  } catch (error) {
    console.error("Error creando vehiculo:", error);
    throw error;
  }
}

// -------------------------
// PUT: Actualizar vehiculo
// -------------------------
export async function updateVehiculo(token: string, id: number, vehiculo: Vehiculo) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/vehiculo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(vehiculo),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error actualizando vehiculo:", error);
    throw error;
  }
}

// -------------------------
// DELETE: Eliminar vehiculo
// -------------------------
export async function deleteVehiculo(token: string, id: number) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/vehiculo/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error eliminando vehiculo:", error);
    throw error;
  }
}
