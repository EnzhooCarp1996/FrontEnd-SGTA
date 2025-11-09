import { PresupuestoData, NewPresupuesto } from "../types";
import axiosInstance from "./AxiosService";

// Normalizar presupuesto
const normalizePresupuesto = (raw: any): PresupuestoData => ({
  ...raw,
  _id: raw._id,
  fecha: raw.fecha,
  idCliente: raw.idCliente ?? undefined,
  cliente: raw.cliente || "",
  domicilio: raw.domicilio || "",
  poliza: raw.poliza || "",
  idVehiculo: raw.idVehiculo ?? undefined,
  vehiculo: raw.vehiculo || "",
  patente: raw.patente || "",
  siniestro: raw.siniestro || "",
  manoDeObraChapa: raw.manoDeObraChapa ?? 0,
  manoDeObraPintura: raw.manoDeObraPintura ?? 0,
  mecanica: raw.mecanica ?? 0,
  electricidad: raw.electricidad ?? 0,
  totalRepuestos: raw.totalRepuestos ?? 0,
  total: raw.total ?? 0,
  items: raw.items || [],
  lugarFecha: raw.lugarFecha || "",
  firmaCliente: raw.firmaCliente || "",
  firmaResponsable: raw.firmaResponsable || "",
  observaciones: raw.observaciones || "",
  ruedaAuxilio: raw.ruedaAuxilio || "",
  encendedor: raw.encendedor || "",
  cricket: raw.cricket || "",
  herramientas: raw.herramientas || "",
});

// GET: Traer presupuestos
export const getPresupuestos = async () => {
  const { data } = await axiosInstance.get<any[]>("/presupuesto");
  return data.map(normalizePresupuesto);
};

// POST: Crear presupuesto
export const createPresupuesto = async (presupuesto: NewPresupuesto) => {
  const { data } = await axiosInstance.post("/presupuesto", presupuesto);
  return normalizePresupuesto(data);
};

// PUT: Actualizar presupuesto
export const updatePresupuesto = async (presupuesto: PresupuestoData) => {
  const { data } = await axiosInstance.put(
    `/presupuesto/${presupuesto._id}`,
    presupuesto
  );
  return normalizePresupuesto(data);
};

// DELETE: Eliminar presupuesto
export const deletePresupuesto = async (id: string) => {
  const { data } = await axiosInstance.delete(`/presupuesto/${id}`);
  return data;
};
