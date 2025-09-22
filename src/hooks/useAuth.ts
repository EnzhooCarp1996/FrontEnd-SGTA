import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use Auth debe usarse dentro de un AuthProvider");
  }
  return context;
}
