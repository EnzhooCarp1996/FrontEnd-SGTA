
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
    const [año, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${año}`;
};