import { createContext } from "react";
import { User } from "../../types";

interface AuthContextType extends User {
  token: string | null;
  login: (
    token: string,
    recordar?: boolean,
    user?: { nombreUsuario: string; role: string }
  ) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
