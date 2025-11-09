import { NuevaParteDto, PartesVehiculo } from "../types/PartesVehiculo";
import axiosInstance from "./AxiosService";

export const getPartesVehiculo = async () => {
  const { data } = await axiosInstance.get<PartesVehiculo[]>("/partesvehiculo");
  return data;
};

export const agregarComponente = async (dto: NuevaParteDto) => {
  try {
    const { data } = await axiosInstance.post("/partesvehiculo/agregar-componente", dto);
    return data;
  } catch (error: any) {
    throw error.response?.data || "Error al agregar componente";
  }
};