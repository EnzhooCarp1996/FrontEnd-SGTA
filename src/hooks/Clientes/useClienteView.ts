import { useClientes } from "../../hooks/Clientes/useClientes";
import { Cliente, NewCliente } from "../../types";
import { useState } from "react";

export const useClienteView = () => {
  const {
    clientes,
    errorCliente,
    agregarCliente,
    modificarCliente,
    eliminarCliente,
  } = useClientes();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editarCliente, setEditarCliente] = useState<Cliente | undefined>();

  const handleAdd = () => {
    setEditarCliente(undefined);
    setMostrarForm(true);
  };

  const handleEdit = (cliente: Cliente) => {
    setEditarCliente(cliente);
    setMostrarForm(true);
  };

  const handleSave = async (cliente: Partial<Cliente>) => {
    try {
      if (editarCliente) {
        const clienteCompleto: Cliente = { ...editarCliente, ...cliente };
        await modificarCliente(clienteCompleto);
      } else {
        await agregarCliente(cliente as NewCliente);
      }
      setMostrarForm(false);
      setEditarCliente(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditarCliente(undefined);
    setMostrarForm(false);
  };

  return {
    clientes,
    errorCliente,
    mostrarForm,
    editarCliente,
    handleAdd,
    handleEdit,
    handleSave,
    handleCancel,
    eliminarCliente,
  };
};
