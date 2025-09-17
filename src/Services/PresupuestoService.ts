import { isTokenExpired, logout } from "./AuthService";
import toast from "react-hot-toast";
import { NewPresupuesto, Presupuesto } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// -------------------------
// GET: Traer presupuestos
// -------------------------
export async function getPresupuestos(token: string) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/presupuesto`, {
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
    console.error("Error obteniendo presupuestos:", error);
    throw error;
  }
}

// -------------------------
// POST: Crear presupuesto
// -------------------------
export async function createPresupuesto(token: string, presupuesto: NewPresupuesto) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/presupuesto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(presupuesto),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creando presupuesto:", error);
    throw error;
  }
}

// -------------------------
// PUT: Actualizar presupuesto
// -------------------------
export async function updatePresupuesto(token: string, id: number, presupuesto: Presupuesto) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/presupuesto/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(presupuesto),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error actualizando presupuesto:", error);
    throw error;
  }
}

// -------------------------
// DELETE: Eliminar presupuesto
// -------------------------
export async function deletePresupuesto(token: string, id: number) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/presupuesto/${id}`, {
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
    console.error("Error eliminando presupuesto:", error);
    throw error;
  }
}
