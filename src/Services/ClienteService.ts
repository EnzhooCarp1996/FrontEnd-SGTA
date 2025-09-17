import { isTokenExpired, logout } from "./AuthService";
import toast from "react-hot-toast";
import { Cliente, NewCliente } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// -------------------------
// GET: Traer clientes
// -------------------------
export async function getClientes(token: string) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/cliente`, {
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
// POST: Crear cliente
// -------------------------
export async function createCliente(token: string, cliente: NewCliente) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/cliente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(cliente),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creando cliente:", error);
    throw error;
  }
}

// -------------------------
// PUT: Actualizar cliente
// -------------------------
export async function updateCliente(token: string, id: number, cliente: Cliente) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/cliente/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(cliente),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error actualizando cliente:", error);
    throw error;
  }
}

// -------------------------
// DELETE: Eliminar cliente
// -------------------------
export async function deleteCliente(token: string, id: number) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/cliente/${id}`, {
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
    console.error("Error eliminando cliente:", error);
    throw error;
  }
}
