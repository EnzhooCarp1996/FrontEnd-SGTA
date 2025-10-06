import { isTokenExpired, logout } from "./AuthService";
import { PresupuestoData, NewPresupuesto } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// -------------------------
// FUNCION GENÉRICA
// -------------------------
async function fetchWithAuth<T>(
  token: string,
  url: string,
  options: RequestInit = {}
): Promise<T> {
  if (!token || isTokenExpired(token)) {
    logout();
    alert("Sesión Expirada, Inicie nuevamente");
    throw new Error("Sesión expirada");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw errorData || new Error(`Error HTTP: ${response.status}`);
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

// -----------------------
// NORMALIZAR PRESUPUESTO
// -----------------------
function normalizePresupuesto(raw: any): PresupuestoData {
  return {
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
  };
}

// -----------------------
// GET: Traer presupuestos
// -----------------------
export async function getPresupuestos(
  token: string
): Promise<PresupuestoData[]> {
  const rawList = await fetchWithAuth<any[]>(
    token,
    `${API_BASE_URL}/presupuesto`,
    { method: "GET" }
  );
  return rawList.map(normalizePresupuesto);
}

// -----------------------
// POST: Crear presupuesto
// -----------------------
export async function createPresupuesto(
  token: string,
  presupuesto: NewPresupuesto
): Promise<PresupuestoData> {
  const raw = await fetchWithAuth<any>(token, `${API_BASE_URL}/presupuesto`, {
    method: "POST",
    body: JSON.stringify(presupuesto),
  });
  return normalizePresupuesto(raw);
}

// ---------------------------
// PUT: Actualizar presupuesto
// ---------------------------
export async function updatePresupuesto(
  token: string,
  presupuesto: PresupuestoData
): Promise<PresupuestoData> {
  const raw = await fetchWithAuth<any>(
    token,
    `${API_BASE_URL}/presupuesto/${presupuesto._id}`,
    {
      method: "PUT",
      body: JSON.stringify(presupuesto),
    }
  );
  return normalizePresupuesto(raw);
}

// ----------------------------
// DELETE: Eliminar presupuesto
// ----------------------------
export function deletePresupuesto(token: string, id: string): Promise<boolean> {
  return fetchWithAuth<boolean>(token, `${API_BASE_URL}/presupuesto/${id}`, {
    method: "DELETE",
  });
}
