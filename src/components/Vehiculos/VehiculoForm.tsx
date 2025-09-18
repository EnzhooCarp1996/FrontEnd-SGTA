import React, { useState, useEffect } from 'react';
import { Car } from 'lucide-react';
import { Vehiculo } from '../../types';
import { BotonesForm } from '../BotonesForm';
import { InputForm } from '../InputForm';
import { HeaderForm } from '../HeaderForm';
import { useVehiculos } from '../../hooks/useVehiculos';


interface VehiculoFormProps {
  vehiculo?: Vehiculo;
  onSave: (vehiculo: Partial<Vehiculo>) => void;
  onCancel: () => void;
}

const VehiculoForm: React.FC<VehiculoFormProps> = ({ vehiculo, onSave, onCancel }) => {
  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { marcas, modelos, cargarMarcasYModelos } = useVehiculos(token);


  const [formData, setFormData] = useState({
    patente: vehiculo?.patente || '',
    marca: vehiculo?.marca || '',
    modelo: vehiculo?.modelo || '',
    anio: vehiculo?.anio || new Date().getFullYear(),
    nroDeChasis: vehiculo?.nroDeChasis || '',
    estado: vehiculo?.estado || 'No Recibido',
    fechaRecibido: vehiculo?.fechaRecibido || '',
    fechaEsperada: vehiculo?.fechaEsperada || '',
    fechaEntrega: vehiculo?.fechaEntrega || '',
    descripcionTrabajos: vehiculo?.descripcionTrabajos || '',
    idCliente: vehiculo?.idCliente,
  });


  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (formData.patente.length < 6 || formData.patente.length > 10) {
      newErrors.patente = "debe tener entre 6 y 10 caracteres.";
    }

    if (!formData.nroDeChasis || formData.nroDeChasis.length < 11 || formData.nroDeChasis.length > 20) {
      newErrors.nroDeChasis = "debe tener entre 11 y 20 caracteres.";
    }

    if (!formData.marca.trim()) {
      newErrors.marca = "es obligatoria.";
    }

    if (!formData.modelo.trim()) {
      newErrors.modelo = "es obligatorio.";
    }

    if (!formData.anio || isNaN(formData.anio) || formData.anio <= 0) {
      newErrors.anio = "es obligatorio.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    onSave({
      idVehiculo: vehiculo?.idVehiculo,
      patente: formData.patente,
      marca: formData.marca,
      modelo: formData.modelo,
      anio: Number(formData.anio),
      nroDeChasis: formData.nroDeChasis,
      estado: formData.estado,
      fechaRecibido: formData.fechaRecibido ? formData.fechaRecibido.split("T")[0] : null,
      fechaEsperada: formData.fechaEsperada ? formData.fechaEsperada.split("T")[0] : null,
      fechaEntrega: formData.fechaEntrega ? formData.fechaEntrega.split("T")[0] : null,
      descripcionTrabajos: formData.descripcionTrabajos,
      idCliente: formData.idCliente ? Number(formData.idCliente) : null,
    });
  };

  useEffect(() => {
    if (!token) return;

    cargarMarcasYModelos(vehiculo?.marca); // si es edición, pasar la marca
  }, [token, vehiculo]);





  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let value: string | number = e.target.value;

    if (e.target.type === "number" || e.target.name === "anio" || e.target.name === "idCliente") {
      value = e.target.value ? Number(e.target.value) : 0; // O null si tu backend lo acepta
    }

    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));

    // Si cambió la marca, recargo los modelos
    if (e.target.name === "marca") {
      cargarMarcasYModelos(value as string);
      // También limpio el modelo seleccionado previamente
      setFormData(prev => ({
        ...prev,
        modelo: ''
      }));
    }
  };



  const formatearFecha = (fecha?: string) => fecha?.split("T")[0] || "";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg border-2 border-black shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        <HeaderForm
          icon={Car}
          tituloNuevo="Nuevo Vehículo"
          tituloEditar="Editar Vehículo"
          condicion={!!vehiculo}
          onCancel={onCancel}
        />

        <form className="p-6 space-y-6">
          {/* Información del Vehículo */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Información del Vehículo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputForm label="Patente " name="patente" value={formData.patente} onChange={handleChange} placeholder="ABC123" required error={errors.patente} />
              <InputForm label="Número de Chasis " name="nroDeChasis" value={formData.nroDeChasis} onChange={handleChange} placeholder="JTDBU4DK4KJ123456" required error={errors.nroDeChasis} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Marca */}
              <div>
                <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-2">Marca *</label>
                <select
                  id="marca"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">--Selecciona una marca--</option>
                  {marcas.map((m) => (
                    <option key={`${m.id}-${m.brand}`} value={m.brand}>
                      {m.brand}
                    </option>
                  ))}
                </select>
                {errors.marca && <p className="text-red-500 text-sm">{errors.marca}</p>}
              </div>

              {/* Modelo */}
              <div>
                <label htmlFor="modelo" className="block text-sm font-medium text-gray-700 mb-2">Modelo *</label>
                <select
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">--Selecciona un modelo--</option>
                  {modelos.map((m) => (
                    <option key={`${m.id}-${m.model}`} value={m.model}>
                      {m.model}
                    </option>
                  ))}
                </select>
                {errors.modelo && <p className="text-red-500 text-sm">{errors.modelo}</p>}
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <label htmlFor="anio" className="block text-sm font-medium text-gray-700 mb-2">
                    Año *
                  </label>
                  <input
                    id="anio"
                    type="number"
                    name="anio"
                    value={formData.anio}
                    onChange={handleChange}
                    required
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.anio && <p className="text-red-500 text-sm">{errors.anio}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Estado y Cliente */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Estado y Cliente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="No Recibido">No Recibido</option>
                  <option value="Recibido">Recibido</option>
                  <option value="Proceso">En Proceso</option>
                  <option value="Entregado">Entregado</option>
                </select>
              </div>
              <InputForm label="Cliente ID " name="idCliente" value={formData.idCliente || ""} onChange={handleChange} placeholder="ID del cliente" />

            </div>
          </div>

          {/* Fechas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Fechas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputForm label="Fecha de Recepción " type="date" name="fechaRecibido" value={formatearFecha(formData.fechaRecibido)} onChange={handleChange} />
              <InputForm label="Fecha Esperada " type="date" name="fechaEsperada" value={formatearFecha(formData.fechaEsperada)} onChange={handleChange} />
              <InputForm label="Fecha de Entrega " type="date" name="fechaEntrega" value={formatearFecha(formData.fechaEntrega)} onChange={handleChange} />
            </div>
          </div>

          {/* Descripción de Trabajos */}
          <div>
            <label htmlFor="descripcionTrabajos" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción de Trabajos *
            </label>
            <textarea
              id="descripcionTrabajos"
              name="descripcionTrabajos"
              value={formData.descripcionTrabajos}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Describe los trabajos a realizar en el vehículo..."
            />
          </div>

          {/* Botones */}
          <BotonesForm
            onGuardar={handleSubmit}
            onCancel={onCancel}
          />

        </form>
      </div>
    </div>
  );
};

export default VehiculoForm;