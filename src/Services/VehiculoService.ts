import { Vehiculo, NewVehiculo } from "../types";
import axiosInstance from "./AxiosService";

// GET: Traer vehiculos
export const getVehiculos = async () => {
  const { data } = await axiosInstance.get<Vehiculo[]>("/vehiculo");
  return data;
};

// POST: Crear vehiculo
export const createVehiculo = async (vehiculo: NewVehiculo) => {
  const { data } = await axiosInstance.post<Vehiculo>("/vehiculo", vehiculo);
  return data;
};

// PUT: Actualizar vehiculo
export const updateVehiculo = async (vehiculo: Vehiculo) => {
  const { data } = await axiosInstance.put<Vehiculo>(
    `/vehiculo/${vehiculo.idVehiculo}`,
    vehiculo
  );
  return data;
};

// DELETE: Eliminar vehiculo
export const deleteVehiculo = async (id: number) => {
  const { data } = await axiosInstance.delete<boolean>(`/vehiculo/${id}`);
  return data;
};
