import { usePartesVehiculoContext } from "../../context/Presupuestos/usePartesVehiculoContext";
import { useState, useEffect } from "react";

export const useMenuDesplegable = (
  ubicacion: string,
  valorActual: string,
  descripcionUsadasProp: string[] = []
) => {
  const { estructuraPartes, addComponente } = usePartesVehiculoContext();
  const [parte1, setParte1] = useState("");
  const [parte2, setParte2] = useState("");
  const [parte3, setParte3] = useState("");

  const [descripcionUsadas, setDescripcionUsadas] = useState<string[]>(
    descripcionUsadasProp
  );

  useEffect(() => {
    setDescripcionUsadas(descripcionUsadasProp);
  }, [descripcionUsadasProp]);

  // Inicializa select según valorActual
  useEffect(() => {
    if (!valorActual) {
      setParte1("");
      setParte2("");
      setParte3("");
      return;
    }
    const partesSplit = valorActual.split("|");
    setParte1(partesSplit[0] || "");
    setParte2(partesSplit[1] || "");
    setParte3(partesSplit[2] || "");
  }, []);

  const descripcionCompleta = (p1: string, p2?: string, p3?: string) =>
    [p1, p2, p3].filter(Boolean).join("|");

  const opcionesParte1 = estructuraPartes[ubicacion]
    ? Object.keys(estructuraPartes[ubicacion])
    : [];

  const opcionesParte2 =
    parte1 &&
    estructuraPartes[ubicacion] &&
    estructuraPartes[ubicacion][parte1] &&
    estructuraPartes[ubicacion][parte1] !== null
      ? Object.keys(
          estructuraPartes[ubicacion][parte1] as Record<string, string[]>
        )
      : [];

  const opcionesParte3 =
    parte1 &&
    parte2 &&
    estructuraPartes[ubicacion] &&
    estructuraPartes[ubicacion][parte1] &&
    estructuraPartes[ubicacion][parte1] !== null
      ? (estructuraPartes[ubicacion][parte1] as Record<string, string[]>)[
          parte2
        ] || []
      : [];

  const estaUsada = (desc: string) =>
    descripcionUsadas.includes(desc) && desc !== valorActual;

  return {
    parte1,
    parte2,
    parte3,
    setParte1,
    setParte2,
    setParte3,
    descripcionCompleta,
    opcionesParte1,
    opcionesParte2,
    opcionesParte3,
    estaUsada,
    addComponente 
  };
};
