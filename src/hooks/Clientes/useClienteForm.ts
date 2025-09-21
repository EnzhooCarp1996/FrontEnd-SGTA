import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { Cliente } from "../../types";

type TipoCliente = "Persona" | "Empresa";

export function useClienteForm(cliente?: Cliente) {
  const { token } = useAuth();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [tipoCliente, setTipoCliente] = useState<TipoCliente>(
    cliente?.tipoCliente === "Empresa" ? "Empresa" : "Persona"
  );
  const [formData, setFormData] = useState({
    telefono: cliente?.telefono || "",
    celular: cliente?.celular || "",
    responsabilidad: cliente?.responsabilidad || "",
    tipoDocumento: cliente?.tipoDocumento || "",
    documento: cliente?.documento || "",
    nombre: cliente?.nombre || "",
    apellido: cliente?.apellido || "",
    razonSocial: cliente?.razonSocial || "",
    nombreDeFantasia: cliente?.nombreDeFantasia || "",
  });

  const formatDocumento = (value: string, tipo: string) => {
    const numbers = value.replace(/\D/g, "");
    if (tipo === "CUIL" || tipo === "CUIT") {
      const parte1 = numbers.slice(0, 2);
      const parte2 = numbers.slice(2, 10);
      const parte3 = numbers.slice(10, 11);
      let result = parte1;
      if (parte2) result += "-" + parte2;
      if (parte3) result += "-" + parte3;
      return result;
    }
    return numbers;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value = e.target.value;

    if (e.target.name === "documento") {
      value = formatDocumento(value, formData.tipoDocumento);
    }

    if (e.target.name === "telefono" || e.target.name === "celular") {
      value = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (tipoCliente === "Persona") {
      if (!formData.nombre.trim()) newErrors.nombre = "es obligatorio.";
      if (!formData.apellido.trim()) newErrors.apellido = "es obligatorio.";
    } else {
      if (!formData.razonSocial.trim())
        newErrors.razonSocial = "es obligatoria.";
    }

    if (!formData.responsabilidad)
      newErrors.responsabilidad = "es obligatoria.";
    if (!formData.tipoDocumento) newErrors.tipoDocumento = "es obligatorio.";
    if (!formData.documento || formData.documento.length < 7) {
      newErrors.documento = "debe ser válido.";
    }
    if (!formData.telefono || formData.telefono.length < 7) {
      newErrors.telefono = "debe ser válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildCliente = (): Partial<Cliente> => {
    const baseData = {
      idCliente: cliente?.idCliente,
      telefono: formData.telefono,
      celular: formData.celular,
      responsabilidad: formData.responsabilidad as
        | "ConsumidorFinal"
        | "Monotributista"
        | "ResponsableInscripto",
      tipoDocumento: formData.tipoDocumento as "DNI" | "CUIL" | "CUIT",
      documento: formData.documento,
    };

    if (tipoCliente === "Persona") {
      return {
        ...baseData,
        nombre: formData.nombre,
        apellido: formData.apellido,
        tipoCliente: "Persona",
      };
    } else {
      return {
        ...baseData,
        razonSocial: formData.razonSocial,
        nombreDeFantasia: formData.nombreDeFantasia,
        tipoCliente: "Empresa",
      };
    }
  };

  useEffect(() => {
    if (!token) return;
  }, [token, cliente]);

  return {
    formData,
    errors,
    tipoCliente,
    setTipoCliente,
    handleChange,
    validate,
    buildCliente,
  };
}
