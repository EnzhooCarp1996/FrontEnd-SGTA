import { createContext } from "react";
import { User } from "../../types";

interface AuthContextType {
  token: string | null;
  nombreUsuario: string;
  role: string;
  login: (token: string, recordar: boolean, user?: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);