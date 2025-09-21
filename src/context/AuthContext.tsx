import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  login: (token: string, recordar: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

interface JwtPayload {
  exp: number; 
  sub: string; 
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🔹 Función para validar el token
const isTokenValid = (token: string): boolean => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const savedLocal = localStorage.getItem("token");
    const savedSession = sessionStorage.getItem("token");

    if (savedLocal && isTokenValid(savedLocal)) return savedLocal;
    if (savedSession && isTokenValid(savedSession)) return savedSession;

    return null;
  });

  // 🔹 Mantener sincronización entre pestañas
  useEffect(() => {
    const handleStorage = () => {
      const savedLocal = localStorage.getItem("token");
      const savedSession = sessionStorage.getItem("token");

      if (savedLocal && isTokenValid(savedLocal)) {
        setToken(savedLocal);
      } else if (savedSession && isTokenValid(savedSession)) {
        setToken(savedSession);
      } else {
        setToken(null);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = (newToken: string, recordar: boolean) => {
    if (isTokenValid(newToken)) {
      if (recordar) {
        localStorage.setItem("token", newToken);
      } else {
        sessionStorage.setItem("token", newToken);
      }
      setToken(newToken);
    } else {
      console.error("Token inválido o expirado");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
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
