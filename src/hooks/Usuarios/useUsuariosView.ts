import { useUsuarios } from "../Usuarios/useUsuarios";
import { Usuario, NewUsuario } from "../../types";
import { useState } from "react";

export const useUsuarioView = () => {
  const {
    usuarios,
    errorUsuario,
    agregarUsuario,
    modificarUsuario,
    eliminarUsuario,
  } = useUsuarios();
  const [editarUsuario, setEditarUsuario] = useState<Usuario | undefined>();

  const handleAdd = () => {
    setEditarUsuario(undefined);
  };

  const handleEdit = (usuario: Usuario) => {
    setEditarUsuario({...usuario});
  };

  const handleSave = async (usuario: Partial<Usuario>) => {
    try {
      if (editarUsuario) {
        const usuarioCompleto: Usuario = { ...editarUsuario, ...usuario };
        await modificarUsuario(usuarioCompleto);
      } else {
        await agregarUsuario(usuario as NewUsuario);
      }
      setEditarUsuario(undefined);
    } catch (err) {
      console.error(err);
    }
  };


  return {
    usuarios,
    errorUsuario,
    editarUsuario,
    handleAdd,
    handleEdit,
    handleSave,
    eliminarUsuario,
  };
};
