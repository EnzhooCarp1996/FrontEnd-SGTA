import { Usuario, NewUsuario } from "../types";
import axiosInstance from "./AxiosService";

// GET: Traer usuarios
export const getUsuarios = async () => {
  const { data } = await axiosInstance.get<Usuario[]>("/usuario");
  return data;
};

// POST: Crear usuario
export const createUsuario = async (usuario: NewUsuario) => {
  const { data } = await axiosInstance.post<Usuario>("/usuario", usuario);
  return data;
};

// PUT: Actualizar usuario
export const updateUsuario = async (usuario: Usuario) => {
  const { data } = await axiosInstance.put<Usuario>(
    `/vehiculo/${usuario.idUsuario}`,
    usuario
  );
  return data;
};

// DELETE: Eliminar usuario
export const deleteUsuario = async (id: number) => {
  const { data } = await axiosInstance.delete<boolean>(`/usuario/${id}`);
  return data;
};
