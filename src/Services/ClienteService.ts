import { Cliente, NewCliente } from "../types";
import axiosInstance from "./AxiosService";

// GET: Traer clientes
export const getClientes = async () => {
  const { data } = await axiosInstance.get<Cliente[]>("/cliente");
  return data;
};

// POST: Crear cliente
export const createCliente = async (cliente: NewCliente) => {
  const { data } = await axiosInstance.post<Cliente>("/cliente", cliente);
  return data;
};

// PUT: Actualizar cliente
export const updateCliente = async (cliente: Cliente) => {
  const { data } = await axiosInstance.put<Cliente>(
    `/cliente/${cliente.idCliente}`,
    cliente
  );
  return data;
};

// DELETE: Eliminar cliente
export const deleteCliente = async (id: number) => {
  const { data } = await axiosInstance.delete<boolean>(`/cliente/${id}`);
  return data;
};
