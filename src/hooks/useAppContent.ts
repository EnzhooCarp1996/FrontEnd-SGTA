import { useAuth } from "../context/Auth/useAuth";
import { useState } from "react";

export const useAppContent = () => {
  const { role } = useAuth();
  const [abrirBarraLateral, setAbrirBarraLateral] = useState(false);

  const alternarBarraLateral = () => setAbrirBarraLateral((prev) => !prev);

  return {
    role,
    abrirBarraLateral,
    alternarBarraLateral,
  };
};
