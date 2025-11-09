export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount);

export const opcionesMeses = [
  { value: "all", label: "Todos los Meses" },
  { value: "current", label: "Mes actual" },
  { value: "previous", label: "Mes anterior" },
];

export const formatearFecha = (iso: string): string => {
  const [año, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${año}`;
};

export const formatearImporte = (importe: number) =>
  new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(importe);

export const formatearFecha2 = (fecha: string | Date) => {
  const d = new Date(fecha);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const ubicacionesPartes = [
  "PARTE DELANTERA",
  "PARTE TRASERA",
  "INTERIOR",
  "LADO DERECHO",
  "LADO IZQUIERDO",
  "MOTOR",
  "CHASIS",
  "TREN DELANTERO",
  "TREN TRASERO",
  "TRANSMISION",
  "DIRECCION",
];
