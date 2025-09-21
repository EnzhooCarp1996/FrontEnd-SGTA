import { isTokenExpired, logout } from "./AuthService";
import { NewUsuario, Usuario } from "../types";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// -------------------------
// GET: Traer Usuarios
// -------------------------
export async function getUsuarios(token: string) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/usuario`, {
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
    console.error("Error obteniendo usuarios:", error);
    throw error;
  }
}

// -------------------------
// POST: Crear usuario
// -------------------------
export async function createUsuario(token: string, usuario: NewUsuario) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
}

// -------------------------
// PUT: Actualizar usuario
// -------------------------
export async function updateUsuario(token: string, id: number, usuario: Usuario) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/usuario/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
}

// -------------------------
// DELETE: Eliminar usuario
// -------------------------
export async function deleteUsuario(token: string, id: number) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/usuario/${id}`, {
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
    console.error("Error eliminando usuario:", error);
    throw error;
  }
}
