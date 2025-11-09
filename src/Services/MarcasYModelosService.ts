import axiosInstance from "./AxiosService";

// GET: Traer marcas
export const getMarcas = async () => {
  const { data } = await axiosInstance.get<string[]>("/vehiculo/marcas");
  return data;
};

// GET: Traer modelos
export const getModelos = async (marca: string) => {
  const { data } = await axiosInstance.get<string[]>(
    `/vehiculo/modelos/${marca}`
  );
  return data;
};
