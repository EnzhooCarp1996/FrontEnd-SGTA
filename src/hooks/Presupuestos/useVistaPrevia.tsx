import { PresupuestoPDF } from "../../components/Presupuestos/PresupuestoPDF";
import { NewPresupuesto } from "../../types";
import { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";

export const useVistaPrevia = (
  presupuesto: NewPresupuesto,
  onSave: () => void,
  onClose: () => void
) => {
  const [pdfKey, setPdfKey] = useState(0);

  // Calcular total de repuestos
  const totalImporteRepuestos = presupuesto.items.reduce(
    (sum, item) => sum + item.importe,
    0
  );

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

  const handleSaveAndDownload = async () => {
    await onSave();
    const blob = await pdf(
      <PresupuestoPDF presupuesto={presupuestoConTotal} />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Presupuesto_${presupuesto.cliente?.replace(/\s+/g, "_")}_${presupuesto.fecha
      }.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
    handleSaveAndDownload
  };
};
