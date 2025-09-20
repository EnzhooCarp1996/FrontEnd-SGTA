import { useState } from "react";
import { getMarcas, getModelos } from "../Services/ApiGitService";
import { useAuth } from "./useAuth";

export function useApiGit() {
  const { token } = useAuth();
  const [marcas, setMarcas] = useState<{ id: number; brand: string }[]>([]);
  const [modelos, setModelos] = useState<{ id: number; model: string }[]>([]);

  const cargarMarcasYModelos = async (marcaSeleccionada?: string) => {
    if (!token) return;

    try {
      // Traigo marcas
      const data: any = await getMarcas(token);

      if (!Array.isArray(data.Makes)) {
        console.error("getMarcas.Makes no es un array:", data);
        return;
      }

      const marcasMapeadas = data.Makes.map((m: any, i: number) => ({
        id: m.make_id || i,
        brand: m.make_display || m.make_name || m,
      }));
      setMarcas(marcasMapeadas);

      // Si hay marca seleccionada, traigo modelos
      if (marcaSeleccionada) {
        const modelosData: any = await getModelos(token, marcaSeleccionada);

        if (!Array.isArray(modelosData.Models)) {
          console.error("getModelos.Models no es un array:", modelosData);
          return;
        }

        const modelosMapeados = modelosData.Models.map((m: any) => ({
          id: m.model_id,
          model: m.model_name || m.model_display,
        }));
        setModelos(modelosMapeados);
      } else {
        setModelos([]); // limpio modelos si no hay marca
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


