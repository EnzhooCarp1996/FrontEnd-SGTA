import { logIn } from "../Services/AuthService";
import { useAuth } from "./useAuth";
import { useState } from "react";

export function useLoginForm() {
  const { login } = useAuth();

  const [showContrasenia, setShowContrasenia] = useState(false);
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    contrasenia: "",
    recordar: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await logIn( formData.nombreUsuario, formData.contrasenia );
      login(data.token, formData.recordar, { nombreUsuario: data.nombreUsuario, role: data.role });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    showContrasenia,
    loading,
    error,
    setShowContrasenia,
    handleChange,
    handleSubmit,
  };
}
