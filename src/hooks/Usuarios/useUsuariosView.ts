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
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editarUsuario, setEditarUsuario] = useState<Usuario | undefined>();

  const handleAdd = () => {
    setEditarUsuario(undefined);
    setMostrarForm(true);
  };

  const handleEdit = (usuario: Usuario) => {
    setEditarUsuario(usuario);
    setMostrarForm(true);
  };

  const handleSave = async (usuario: Partial<Usuario>) => {
    try {
      if (editarUsuario) {
        const usuarioCompleto: Usuario = { ...editarUsuario, ...usuario };
        await modificarUsuario(usuarioCompleto);
      } else {
        await agregarUsuario(usuario as NewUsuario);
      }
      setMostrarForm(false);
      setEditarUsuario(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditarUsuario(undefined);
    setMostrarForm(false);
  };

  return {
    usuarios,
    errorUsuario,
    mostrarForm,
    editarUsuario,
    handleAdd,
    handleEdit,
    handleSave,
    handleCancel,
    eliminarUsuario,
  };
};
