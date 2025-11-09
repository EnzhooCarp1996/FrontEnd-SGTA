import { NewPresupuesto } from "../../types";

export const usePresupuestoPDF = (presupuesto: NewPresupuesto) => {
  const totalImporte = presupuesto.items.reduce(
    (sum, item) => sum + item.importe,
    0
  );
  const total = presupuesto.total || 0;

  // Divide texto en líneas respetando palabras
  const splitByWords = (text: string, maxLength: number): string[] => {
    const words = text.trim().split(/\s+/);
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      if ((currentLine + word).length > maxLength) {
        lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    }

    if (currentLine.trim()) lines.push(currentLine.trim());
    return lines;
  };

  const maxCharsPerLinea = 58;
  const observaciones = presupuesto.observaciones || "";
  const lineas = splitByWords(
    observaciones.replace(/\n/g, ""),
    maxCharsPerLinea
  );

  return {
    totalImporte,
    total,
    lineas,
  };
};
