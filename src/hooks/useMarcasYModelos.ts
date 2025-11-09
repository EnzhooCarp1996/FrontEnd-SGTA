import { getMarcas, getModelos } from "../Services/MarcasYModelosService";
import { useState } from "react";

export function useMarcasYModelos() {
  const [marcas, setMarcas] = useState<{ id: number; brand: string }[]>([]);
  const [modelos, setModelos] = useState<{ id: number; model: string }[]>([]);

  const cargarMarcasYModelos = async (marcaSeleccionada?: string) => {
    try {
      // Traer marcas
      const data = await getMarcas();

      if (!Array.isArray(data)) {
        console.error("La API de marcas no devolvió un array:", data);
        return;
      }

      // Mapear las marcas (cada elemento es un string)
      const marcasMapeadas = data.map((m: string, i: number) => ({
        id: i,
        brand: m,
      }));
      setMarcas(marcasMapeadas);

      // Si se seleccionó una marca, traer modelos
      if (marcaSeleccionada) {
        const modelosData = await getModelos(marcaSeleccionada);

        if (!Array.isArray(modelosData)) {
          console.error("el back no devolvió un array:", modelosData);
          return;
        }

        // 🔹 Mapear modelos (cada elemento es un string)
        const modelosMapeados = modelosData.map((m: string, i: number) => ({
          id: i,
          model: m,
        }));
        setModelos(modelosMapeados);
      } else {
        setModelos([]);
      }
    } catch (err) {
      console.error("Error cargando marcas o modelos:", err);
    }
  };

  return {
    marcas,
    modelos,
    cargarMarcasYModelos,
  };
}
