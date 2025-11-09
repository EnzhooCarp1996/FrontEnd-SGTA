import { Cliente, NewCliente } from "../../types";
import { useState, useEffect } from "react";
import {
  createCliente,
  getClientes,
  updateCliente,
  deleteCliente,
} from "../../Services/ClienteService";

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [errorCliente, setError] = useState<string | null>(null);

  // -------------------------------
  // HELPERS
  // -------------------------------
  const getNombreCliente = (cliente: NewCliente | Cliente) =>
    cliente.tipoCliente === "Persona"
      ? `${cliente.nombre} ${cliente.apellido}`
      : cliente.razonSocial;

  const handleError = (action: string, err: unknown) => {
    if (err instanceof Error) {
      alert(`❌ Error al ${action} el cliente: ${err.message}`);
    } else {
      alert(`❌ Error desconocido al ${action} el cliente`);
    }
  };

  // -------------------------------
  // FETCH INICIAL
  // -------------------------------
  useEffect(() => {
    getClientes()
      .then((data) => setClientes(data))
      .catch((err) => setError(err.message));
  }, []);

  // -------------------------------
  // CREATE
  // -------------------------------
  const agregarCliente = async (newCliente: NewCliente) => {
    try {
      const clienteCreado = await createCliente(newCliente);
      setClientes((prev) => [...prev, clienteCreado]);

      alert(
        `👤 ¡Agregado correctamente!\n✅ Cliente: ${getNombreCliente(
          newCliente
        )}\n🆔 Documento: ${newCliente.documento}`
      );
      return clienteCreado;
    } catch (err: unknown) {
      handleError("crear", err);
      throw err;
    }
  };

  // -------------------------------
  // UPDATE
  // -------------------------------
  const modificarCliente = async (clienteActualizado: Cliente) => {
    try {
      const cliente = await updateCliente(clienteActualizado);
      setClientes((prev) =>
        prev.map((c) => (c.idCliente === cliente.idCliente ? cliente : c))
      );

      alert(
        `👤 ¡Actualizado correctamente!\n✅ Cliente: ${getNombreCliente(
          clienteActualizado
        )}\n🆔 Documento: ${clienteActualizado.documento}`
      );
      return cliente;
    } catch (err: unknown) {
      handleError("actualizar", err);
      throw err;
    }
  };

  // -------------------------------
  // DELETE
  // -------------------------------
  const eliminarCliente = async (id: number) => {
    const confirmar = window.confirm(
      "⚠️ ¿Estás seguro de eliminar este cliente?"
    );
    if (!confirmar) return;

    try {
      await deleteCliente(id);
      setClientes((prev) => prev.filter((c) => c.idCliente !== id));
      alert("Cliente eliminado correctamente ✅");
    } catch (err: unknown) {
      handleError("eliminar", err);
    }
  };

  return {
    clientes,
    errorCliente,
    agregarCliente,
    modificarCliente,
    eliminarCliente,
  };
}
