import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

interface JwtPayload {
  exp: number; // tiempo de expiración (en segundos desde epoch)
  sub: string; // identificador del usuario (puede variar según tu backend)
  // podés agregar más campos según tu backend
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🔹 Función para validar el token
const isTokenValid = (token: string): boolean => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // exp viene en segundos
  } catch {
    return false;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken && isTokenValid(savedToken) ? savedToken : null;
  });

  // 🔹 Mantener sincronización entre pestañas
  useEffect(() => {
    const handleStorage = () => {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken && isTokenValid(savedToken) ? savedToken : null);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = (newToken: string) => {
    if (isTokenValid(newToken)) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } else {
      console.error("Token inválido o expirado");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
