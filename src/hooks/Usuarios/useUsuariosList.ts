import { useUsuarios } from "./useUsuarios";
import { useState } from "react";

export function useUsuariosList() {
  const { usuarios, errorUsuario, eliminarUsuario } = useUsuarios();
  const [searchTerm, setSearchTerm] = useState("");


  return {
    usuarios,
    errorUsuario,
    eliminarUsuario,
    searchTerm,
    setSearchTerm,
  };
}
