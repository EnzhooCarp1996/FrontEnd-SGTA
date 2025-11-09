import { getToken, logout as sessionLogout } from "../../Services/SessionService";
import { getUserInfo } from "../../Services/AuthService";
import { ReactNode, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(getToken());
  const [userInfo, setUserInfo] = useState<User>(getUserInfo());

  const login = (
    newToken: string,
    recordar: boolean = true,
    user?: { nombreUsuario: string; role: string }
  ) => {
    if (recordar) {
      localStorage.setItem("token", newToken);
    } else {
      sessionStorage.setItem("token", newToken);
    }

    setToken(newToken);
    setUserInfo(user || getUserInfo());
  };


  const logout = () => {
    sessionLogout();
    setToken(null);
    setUserInfo({ nombreUsuario: "", role: "" });
  };

  useEffect(() => {
    // Sincronización entre pestañas
    const handleStorage = () => {
      const t = getToken();
      setToken(t);
      setUserInfo(getUserInfo());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

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
