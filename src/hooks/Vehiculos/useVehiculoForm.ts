import { useState, useEffect } from "react";
import { useApiGit } from "../useApiGit";
import { Vehiculo } from "../../types";
import { useAuth } from "../../context/Auth/useAuth";

export function useVehiculoForm(
  vehiculo?: Vehiculo,
  onSave?: (vehiculo: Partial<Vehiculo>) => void
) {
  const { token } = useAuth();
  const { marcas, modelos, cargarMarcasYModelos } = useApiGit();

  const [formData, setFormData] = useState({
    patente: vehiculo?.patente || "",
    marca: vehiculo?.marca || "",
    modelo: vehiculo?.modelo || "",
    anio: vehiculo?.anio || new Date().getFullYear(),
    nroDeChasis: vehiculo?.nroDeChasis || "",
    estado: vehiculo?.estado || "No Recibido",
    fechaRecibido: vehiculo?.fechaRecibido || "",
    fechaEsperada: vehiculo?.fechaEsperada || "",
    fechaEntrega: vehiculo?.fechaEntrega || "",
    descripcionTrabajos: vehiculo?.descripcionTrabajos || "",
    idCliente: vehiculo?.idCliente,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!token) return;
    cargarMarcasYModelos(vehiculo?.marca);
  }, [token, vehiculo]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    let value: string | number = e.target.value;
    if (
      e.target.type === "number" ||
      e.target.name === "anio" ||
      e.target.name === "idCliente"
    ) {
      value = e.target.value ? Number(e.target.value) : 0;
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));

    if (e.target.name === "marca") {
      cargarMarcasYModelos(value as string);
      setFormData((prev) => ({ ...prev, modelo: "" }));
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // -------------------------------
    // VALIDACIONES BÁSICAS
    // -------------------------------
    if (formData.patente.length < 6 || formData.patente.length > 10)
      newErrors.patente = "debe tener entre 6 y 10 caracteres.";
    if (
      !formData.nroDeChasis ||
      formData.nroDeChasis.length < 11 ||
      formData.nroDeChasis.length > 20
    )
      newErrors.nroDeChasis = "debe tener entre 11 y 20 caracteres.";
    if (!formData.marca.trim()) newErrors.marca = "es obligatoria.";
    if (!formData.modelo.trim()) newErrors.modelo = "es obligatorio.";
    if (!formData.anio || isNaN(formData.anio) || formData.anio <= 0)
      newErrors.anio = "es obligatorio.";

    // -------------------------------
    // VALIDACIONES DE FECHAS
    // -------------------------------
    const estado = formData.estado?.toLowerCase() ?? "";
    const fechaRecibido = formData.fechaRecibido
      ? new Date(formData.fechaRecibido)
      : null;
    const fechaEsperada = formData.fechaEsperada
      ? new Date(formData.fechaEsperada)
      : null;
    const fechaEntrega = formData.fechaEntrega
      ? new Date(formData.fechaEntrega)
      : null;

    //Si el estado es "Recibido", debe tener fechaRecibido
    if (estado === "recibido" && !fechaRecibido)
      newErrors.fechaRecibido = "Definir la fecha si esta Recibido.";

    // No se puede setear fechaEsperada si no hay fechaRecibido
    if (!fechaRecibido && fechaEsperada)
      newErrors.fechaEsperada = "No puede definir sin fecha de recepción.";

    // No se puede setear fechaEntrega si no hay fechaRecibido
    if (!fechaRecibido && fechaEntrega)
      newErrors.fechaEntrega = "No puede definir sin fecha de recepción.";

    // FechaEsperada >= FechaRecibido
    if (fechaRecibido && fechaEsperada && fechaEsperada < fechaRecibido)
      newErrors.fechaEsperada = "No puede ser anterior a la recibida";

    // Si el estado es "Entregado", debe tener fechaEntrega
    if (estado === "entregado" && !fechaEntrega)
      newErrors.fechaEntrega = "Definir la fecha si esta Entregado.";

    //  FechaEntrega >= FechaRecibido
    if (fechaRecibido && fechaEntrega && fechaEntrega < fechaRecibido)
      newErrors.fechaEntrega = "Tiene que ser mayor a la recepción.";

    // -------------------------------
    // SI HAY ERRORES → DETENER
    // -------------------------------
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // -------------------------------
    // GUARDAR FORMULARIO
    // -------------------------------
    setErrors({});
    onSave?.({
      idVehiculo: vehiculo?.idVehiculo,
      ...formData,
      anio: Number(formData.anio),
      fechaRecibido: formData.fechaRecibido
        ? formData.fechaRecibido.split("T")[0]
        : null,
      fechaEsperada: formData.fechaEsperada
        ? formData.fechaEsperada.split("T")[0]
        : null,
      fechaEntrega: formData.fechaEntrega
        ? formData.fechaEntrega.split("T")[0]
        : null,
    });
  };

  return {
    formData,
    errors,
    marcas,
    modelos,
    handleChange,
    handleSubmit,
  };
}
