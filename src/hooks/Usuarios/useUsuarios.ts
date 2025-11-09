import { Usuario, NewUsuario } from "../../types";
import { useState, useEffect } from "react";
import {
  createUsuario,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
} from "../../Services/UsuarioService";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [errorUsuario, setError] = useState<string | null>(null);

  const handleError = (action: string, err: unknown) => {
    if (err instanceof Error) {
      alert(`❌ Error al ${action} el usuario: ${err.message}`);
    } else {
      alert(`❌ Error desconocido al ${action} el usuario`);
    }
  };

  // -------------------------------
  // FETCH INICIAL
  // -------------------------------
  useEffect(() => {
    getUsuarios()
      .then((data) => setUsuarios(data))
      .catch((err) => setError(err.message));
  }, []);

  // -------------------------------
  // CREATE
  // -------------------------------
  const agregarUsuario = async (newUsuario: NewUsuario) => {
    try {
      const usuarioCreado = await createUsuario(newUsuario);
      setUsuarios((prev) => [...prev, usuarioCreado]);

      alert(
        `✅¡Agregado correctamente!\n👤Usuario: ${newUsuario.nombreUsuario}`
      );
      return usuarioCreado;
    } catch (err: unknown) {
      handleError("crear", err);
      throw err;
    }
  };

  // -------------------------------
  // UPDATE
  // -------------------------------
  const modificarUsuario = async (usuarioActualizado: Usuario) => {
    try {
      const usuario = await updateUsuario(usuarioActualizado);
      setUsuarios((prev) =>
        prev.map((c) => (c.idUsuario === usuario.idUsuario ? usuario : c))
      );

      alert(
        `✅¡Actualizado correctamente!\n👤Usuario: ${usuarioActualizado.nombreUsuario}`
      );
      return usuario;
    } catch (err: unknown) {
      handleError("actualizar", err);
      throw err;
    }
  };

  // -------------------------------
  // DELETE
  // -------------------------------
  const eliminarUsuario = async (id: number, nombre: string) => {
    const confirmar = window.confirm(
      `⚠️ ¿Estás seguro de eliminar al usuario 👤${nombre}?`
    );
    if (!confirmar) return;

    try {
      await deleteUsuario(id);
      setUsuarios((prev) => prev.filter((c) => c.idUsuario !== id));
      alert("Usuario eliminado correctamente ✅");
    } catch (err: unknown) {
      handleError("eliminar", err);
    }
  };

  return {
    usuarios,
    errorUsuario,
    agregarUsuario,
    modificarUsuario,
    eliminarUsuario,
  };
}
