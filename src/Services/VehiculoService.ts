import { isTokenExpired, logout } from "./AuthService";
import toast from "react-hot-toast";
import { NewVehiculo, Vehiculo } from "../types";
import axios from "axios";

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
export async function updateVehiculo(token: string, vehiculo: Vehiculo) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada, vuelva a iniciar sesión");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/vehiculo/${vehiculo.idVehiculo}`, {
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

    // Solo parsear si hay contenido
    const text = await response.text();
    return text ? JSON.parse(text) : vehiculo; // devolvemos el vehiculo actualizado localmente si no hay body
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


// Obtener marcas ----------------------------------------------------------------------------------
export async function getMarcas(token: string) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada");
  }

  try {
    const res = await axios.get(`${API_BASE_URL}/vehiculo/marcas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // Array de strings
  } catch (err: any) {
    console.error("Error al cargar marcas:", err);
    throw err;
  }
}

// Obtener modelos por marca
export async function getModelos(token: string, marca: string) {
  if (!token || isTokenExpired(token)) {
    logout();
    toast.error("Sesión expirada, vuelva a iniciar sesión");
    throw new Error("Sesión expirada");
  }

  try {
    const res = await axios.get(`${API_BASE_URL}/vehiculo/modelos/${marca}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // Array de strings
  } catch (err: any) {
    console.error("Error al cargar modelos:", err);
    throw err;
  }
}
