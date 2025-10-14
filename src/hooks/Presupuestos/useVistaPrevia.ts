import { NewPresupuesto } from "../../types";
import { useEffect, useState } from "react";

export const useVistaPrevia = (
  presupuesto: NewPresupuesto,
  onSave: () => void,
  onClose: () => void
) => {
  const [pdfKey, setPdfKey] = useState(0);

  // Calcular total de repuestos
  const totalImporteRepuestos = presupuesto.items.reduce((sum, item) => sum + item.importe, 0);

  // Calcular total general
  const totalCalculado =
    Number(presupuesto.manoDeObraChapa || 0) +
    Number(presupuesto.manoDeObraPintura || 0) +
    Number(presupuesto.mecanica || 0) +
    Number(presupuesto.electricidad || 0) +
    Number(totalImporteRepuestos || 0);

  // Copia del presupuesto con total
  const presupuestoConTotal: NewPresupuesto = {
    ...presupuesto,
    total: totalCalculado,
  };

  // Actualizar PDF cuando se abra
  useEffect(() => {
    setPdfKey((prev) => prev + 1);
  }, []);


  // Guardar sin descargar
  const handleOnlySave = () => {
    onSave();
    onClose();
  };

  return {
    pdfKey,
    presupuestoConTotal,
    totalCalculado,
    handleOnlySave,
  };
};
