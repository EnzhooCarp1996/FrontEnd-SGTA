import { jwtDecode } from "jwt-decode";

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}

export function logout(setToken?: (token: string | null) => void) {
  clearSession();
  if (setToken) setToken(null);
  window.location.href = "/login";
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}