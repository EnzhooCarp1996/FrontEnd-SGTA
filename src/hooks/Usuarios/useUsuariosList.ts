import { Usuario } from "../../types";
import { useEffect, useState } from "react";

export function useUsuariosList(
  usuario?: Usuario,
  usuarios?: Usuario[],
  onSave?: (usuario: Partial<Usuario>) => void
) {
  const [formData, setFormData] = useState<Partial<Usuario>>({
    idUsuario: usuario?.idUsuario,
    nombreUsuario: usuario?.nombreUsuario || "",
    correo: usuario?.correo || "",
    contrasenia: usuario?.contrasenia || "",
    role: usuario?.role ?? "Encargado",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (usuario) {
      setFormData({
        idUsuario: usuario.idUsuario,
        nombreUsuario: usuario.nombreUsuario,
        correo: usuario.correo,
        contrasenia: usuario.contrasenia,
        role: usuario.role,
      });
    } else {
      resetForm();
    }
  }, [usuario]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    // Validación: correo único solo al crear
    if (
      !formData.idUsuario &&
      usuarios?.some((u) => u.correo === formData.correo)
    ) {
      alert("⚠️ Este correo ya está registrado");
      return;
    }

    console.log("Enviando usuario", formData);

    onSave?.(formData);

    setFormData({
      nombreUsuario: "",
      correo: "",
      contrasenia: "",
      role: undefined,
    });
  };
  const resetForm = () => {
    setFormData({
      nombreUsuario: "",
      correo: "",
      contrasenia: "",
      role: undefined,
    });
  };

  return {
    formData,
    searchTerm,
    handleSubmit,
    handleChange,
    setSearchTerm,
    resetForm,
  };
}
