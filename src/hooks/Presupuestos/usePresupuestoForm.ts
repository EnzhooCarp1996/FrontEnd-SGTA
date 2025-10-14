import { Cliente, PresupuestoData, PresupuestoItem, Vehiculo } from "../../types";
import { useState, useEffect, useRef } from "react";


export function usePresupuestoForm(
  vehiculos: Vehiculo[],
  clientes: Cliente[],
  presupuestos?: PresupuestoData,
  onSave?: (presupuestos: Partial<PresupuestoData>) => void
) {
  const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatearFecha = (fecha: string | Date) => {
    const d = new Date(fecha);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [formData, setFormData] = useState({
    fecha: presupuestos
      ? formatearFecha(presupuestos.fecha)
      : new Date().toISOString().split("T")[0],
    idCliente: presupuestos?.idCliente ?? 0,
    cliente: presupuestos?.cliente ?? "",
    domicilio: presupuestos?.domicilio ?? "",
    poliza: presupuestos?.poliza ?? "",
    idVehiculo: presupuestos?.idVehiculo ?? 0,
    vehiculo: presupuestos?.vehiculo ?? "",
    patente: presupuestos?.patente ?? "",
    siniestro: presupuestos?.siniestro ?? "",
    manoDeObraChapa: presupuestos?.manoDeObraChapa ?? 0,
    manoDeObraPintura: presupuestos?.manoDeObraPintura ?? 0,
    mecanica: presupuestos?.mecanica ?? 0,
    electricidad: presupuestos?.electricidad ?? 0,
    totalRepuestos: presupuestos?.totalRepuestos ?? 0,
    lugarFecha: presupuestos?.lugarFecha ?? "",
    firmaCliente: presupuestos?.firmaCliente ?? "",
    firmaResponsable: presupuestos?.firmaResponsable ?? "",
    observaciones: presupuestos?.observaciones ?? "",
    ruedaAuxilio: presupuestos?.ruedaAuxilio ?? "",
    encendedor: presupuestos?.encendedor ?? "",
    cricket: presupuestos?.cricket ?? "",
    herramientas: presupuestos?.herramientas ?? "",
    total: presupuestos?.total ?? 0,
    items: presupuestos?.items ?? [],
  });

  useEffect(() => {
    document.body.style.overflow = mostrarVistaPrevia ? "hidden" : "";
  }, [mostrarVistaPrevia]);

  useEffect(() => {
    if (presupuestos?.items) {
      // Calculamos el id máximo existente
      const maxId = Math.max(
        0,
        ...presupuestos.items.map((item) => item.id ?? 0)
      );

      // Inicializamos nextIdRef para que los nuevos ids sean mayores
      nextIdRef.current = maxId + 1;

      setFormData((prev) => ({ ...prev, items: presupuestos.items }));
    }
  }, [presupuestos]);

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

  const nextIdRef = useRef(1);

  const addItem = (ubicacion: string) => {
    const newItem: PresupuestoItem = {
      id: nextIdRef.current++,
      descripcion: "",
      ubicacion,
      a: "",
      b: "",
      observaciones: "",
      importe: 0,
    };
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const updateItem = (
    id: number,
    field: keyof PresupuestoItem,
    value: string | number,
    type?: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id !== id) return item;

        // si es numérico validamos
        if (type === "number") {
          const val = typeof value === "string" ? value : value.toString();
          if (val === "" || (/^\d*\.?\d*$/.test(val) && parseFloat(val) >= 0)) {
            const parsed = val === "" ? 0 : parseFloat(val) || 0;
            return { ...item, [field]: parsed };
          }
          return item;
        }

        // si es string normal
        const updatedItem = { ...item, [field]: value };

        // reglas para a/b
        if (field === "a" && value === "X") updatedItem.b = "--";
        if (field === "b" && value === "X") updatedItem.a = "--";

        return updatedItem;
      }),
    }));
  };

  const removeItem = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const handleValidarYMostrarVistaPrevia = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.fecha) newErrors.fecha = "es obligatoria.";
    if (!formData.cliente.trim()) newErrors.cliente = "es obligatorio.";
    if (!formData.domicilio.trim()) newErrors.domicilio = "es obligatorio.";
    if (!formData.vehiculo.trim()) newErrors.vehiculo = "es obligatorio.";
    if (!formData.patente.trim()) newErrors.patente = "es obligatoria.";
    if (Number(formData.manoDeObraChapa) <= 0)
      newErrors.chapa = "Chapa debe ser mayor a 0.";
    if (Number(formData.manoDeObraPintura) <= 0)
      newErrors.pintura = "Pintura debe ser mayor a 0.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setMostrarVistaPrevia(true);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    onSave?.({
      ...formData,
    });

    setMostrarVistaPrevia(false);
  };

  const handleCerrarModal = () => setMostrarVistaPrevia(false);

  return {
    formData,
    errors,
    mostrarVistaPrevia,
    setFormData,
    handleChange,
    addItem,
    updateItem,
    removeItem,
    handleValidarYMostrarVistaPrevia,
    handleSubmit,
    handleCerrarModal,
  };
}
