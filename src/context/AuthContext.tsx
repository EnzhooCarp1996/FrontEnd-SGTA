import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  nombreUsuario: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  nombreUsuario: string;
  role: string;
  login: (token: string, recordar: boolean, user?: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}


interface JwtPayload {
  exp: number;
  sub: string;
  nombreUsuario?: string;
  role?: string;
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

  const [userInfo, setUserInfo] = useState<User>({ nombreUsuario: "", role: "" });

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
      const savedUserLocal = localStorage.getItem("user");
      const savedUserSession = sessionStorage.getItem("user");

      if (savedLocal && isTokenValid(savedLocal)) {
        setToken(savedLocal);
        setUserInfo(savedUserLocal ? JSON.parse(savedUserLocal) : { nombreUsuario: "", rol: "" });
      } else if (savedSession && isTokenValid(savedSession)) {
        setToken(savedSession);
        setUserInfo(savedUserSession ? JSON.parse(savedUserSession) : { nombreUsuario: "", rol: "" });
      } else {
        setToken(null);
        setUserInfo({ nombreUsuario: "", role: "" });
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = (newToken: string, recordar: boolean, newUser?: User) => {
    if (isTokenValid(newToken)) {
      if (recordar) {
        localStorage.setItem("token", newToken);
        if (newUser) localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        sessionStorage.setItem("token", newToken);
        if (newUser) sessionStorage.setItem("user", JSON.stringify(newUser));
      }
      setToken(newToken);
      if (newUser) setUserInfo(newUser);
    } else {
      console.error("Token inválido o expirado");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setToken(null);
    setUserInfo({ nombreUsuario: "", role: "" });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        nombreUsuario: userInfo.nombreUsuario,
        role: userInfo.role,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
