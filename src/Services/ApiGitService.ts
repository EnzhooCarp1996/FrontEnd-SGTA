import { isTokenExpired, logout } from "./AuthService";
import toast from "react-hot-toast";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
