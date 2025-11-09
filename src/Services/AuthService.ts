import { setToken, getToken, isTokenExpired } from "./SessionService";
import { LoginResponse } from "../types";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface JwtPayload {
  idUsuario: string;
  nombreUsuario: string;
  role: string;
  exp: number;
  sub: string;
}

// -------------------------
// LOGIN
// -------------------------
export async function logIn(
  nombreUsuario: string,
  contrasenia: string
): Promise<LoginResponse> {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { data } = await axios.post<LoginResponse>(
    `${API_BASE_URL}/auth/login`,
    { nombreUsuario, contrasenia }
  );
  // Guardar tokens en sesión
  setToken(data.token);
  if (data.refreshToken)
    localStorage.setItem("refreshToken", data.refreshToken);

  return data;
}

// -------------------------
// USUARIO ACTUAL
// -------------------------
export function getUserInfo() {
  const token = getToken();
  if (!token || isTokenExpired(token)) return { nombreUsuario: "", role: "" };
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return { nombreUsuario: decoded.nombreUsuario, role: decoded.role };
  } catch {
    return { nombreUsuario: "", role: "" };
  }
}
