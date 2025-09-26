import { useState, useEffect } from "react";
import {
  Cliente,
  Presupuesto,
  PresupuestoData,
  PresupuestoItem,
  Vehiculo,
} from "../../types";

export function usePresupuestoForm(
  vehiculos: Vehiculo[],
  clientes: Cliente[],
  presupuestos?: Presupuesto
) {
  const [items, setItems] = useState<PresupuestoItem[]>([]);
  const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<PresupuestoData>({
    idPresupuesto: presupuestos?.idPresupuesto ?? 0,
    fecha: new Date().toISOString().split("T")[0],
    idCliente: presupuestos?.idCliente ?? 0,
    cliente: "",
    domicilio: "",
    poliza: "",
    vehiculo: "",
    patente: "",
    siniestro: "",
    chapa: 0.0,
    pintura: 0.0,
    mecanica: 0.0,
    electricidad: 0.0,
    repuestos: 0.0,
    lugarFecha: "",
    firmaCliente: "",
    firmaResponsable: "",
    observaciones: "",
    ruedaAuxilio: "",
    encendedor: "",
    cricket: "",
    herramientas: "",
    total: 0,
    items: [],
  });

  useEffect(() => {
    document.body.style.overflow = mostrarVistaPrevia ? "hidden" : "";
  }, [mostrarVistaPrevia]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      if (
        value === "" ||
        (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)
      ) {
        setFormData((prev) => ({
          ...prev,
          [name]: value === "" ? 0 : parseFloat(value),
        }));
      }
    } else if (type === "select-one" && name === "idCliente") {
      const numValue = Number(value);
      const selectedCliente = clientes.find((c) => c.idCliente === numValue);

      setFormData((prev) => ({
        ...prev,
        idCliente: isNaN(numValue) ? 0 : numValue,
        cliente:
          (selectedCliente
            ? selectedCliente.tipoCliente === "Persona"
              ? `${selectedCliente.nombre} ${selectedCliente.apellido}`
              : selectedCliente.razonSocial
            : "") || "",
        idVehiculo: 0, // 👈 limpiamos vehículo si cambió cliente
        patente: "", // 👈 limpiamos patente también
      }));
    } else if (type === "select-one" && name === "idVehiculo") {
      const numValue = Number(value);
      const selectedVehiculo = vehiculos.find((v) => v.idVehiculo === numValue);

      setFormData((prev) => ({
        ...prev,
        idVehiculo: isNaN(numValue) ? 0 : numValue,
        vehiculo: selectedVehiculo
      ? `${selectedVehiculo.marca} ${selectedVehiculo.modelo}` // 👈 marca + modelo
      : "",
        patente: selectedVehiculo ? selectedVehiculo.patente : "", // 👈 seteamos patente
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addItem = (ubicacion: string) => {
    const newItem: PresupuestoItem = {
      id: Date.now(),
      descripcion: "",
      ubicacion,
      a: "",
      b: "",
      observaciones: "",
      importe: 0.0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const updateItem = (
    id: number,
    field: keyof PresupuestoItem,
    value: string | number,
    type?: string
  ) => {
    if (type === "number") {
      const val = typeof value === "string" ? value : value.toString();
      if (val === "" || (/^\d*\.?\d*$/.test(val) && parseFloat(val) >= 0)) {
        const parsed = val === "" ? 0 : parseFloat(val) || 0;
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, [field]: parsed } : item
          )
        );
      }
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) return item;
        const updatedItem = { ...item, [field]: value };
        if (field === "a" && value === "X") updatedItem.b = "--";
        if (field === "b" && value === "X") updatedItem.a = "--";
        return updatedItem;
      })
    );
  };

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const handleVistaPrevia = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.fecha) newErrors.fecha = "es obligatoria.";
    if (!formData.poliza.trim()) newErrors.poliza = "es obligatoria.";
    if (!formData.cliente.trim()) newErrors.cliente = "es obligatorio.";
    if (!formData.domicilio.trim()) newErrors.domicilio = "es obligatorio.";
    if (!formData.vehiculo.trim()) newErrors.vehiculo = "es obligatorio.";
    if (!formData.patente.trim()) newErrors.patente = "es obligatoria.";
    if (Number(formData.chapa) <= 0)
      newErrors.chapa = "Chapa debe ser mayor a 0.";
    if (Number(formData.pintura) <= 0)
      newErrors.pintura = "Pintura debe ser mayor a 0.";
    

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setFormData((prev) => ({ ...prev, items }));
    setMostrarVistaPrevia(true);
  };

  const handleGuardar = (onSave: (data: PresupuestoData) => void) => {
    onSave({ ...formData, items });
    setMostrarVistaPrevia(false);
  };

  const handleCerrarModal = () => setMostrarVistaPrevia(false);

  return {
    formData,
    items,
    errors,
    mostrarVistaPrevia,
    setFormData,
    handleChange,
    addItem,
    updateItem,
    removeItem,
    handleVistaPrevia,
    handleGuardar,
    handleCerrarModal,
  };
}
