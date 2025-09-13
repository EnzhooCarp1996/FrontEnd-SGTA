import React, { useState } from 'react';
import { Car } from 'lucide-react';
import { Vehiculo } from '../../types';
import { BotonesForm } from '../BotonesForm/BotonesForm';
import { InputField } from '../InputForm/InputForm';
import { HeaderForm } from '../HeaderForm/HeaderForm';

interface VehiculoFormProps {
  vehiculo?: Vehiculo;
  onSave: (vehiculo: Partial<Vehiculo>) => void;
  onCancel: () => void;
}

const VehiculoForm: React.FC<VehiculoFormProps> = ({ vehiculo, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    patente: vehiculo?.patente || '',
    marca: vehiculo?.marca || '',
    modelo: vehiculo?.modelo || '',
    anio: vehiculo?.anio || new Date().getFullYear(),
    numero_chasis: vehiculo?.nroDeChasis || '',
    estado: vehiculo?.estado || 'No Recibido',
    fecha_recibido: vehiculo?.fechaRecibido || '',
    fecha_esperada: vehiculo?.fechaEsperada || '',
    fecha_entrega: vehiculo?.fechaEntrega || '',
    descripcion_trabajos: vehiculo?.descripcionTrabajos || '',
    id_cliente: vehiculo?.idCliente || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      ...formData,
      idVehiculo: vehiculo?.idVehiculo || Date.now().toString(),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

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

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información del Vehículo */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Información del Vehículo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Patente " name="patente" value={formData.patente} onChange={handleChange} placeholder="ABC123" required />
              <InputField label="Número de Chasis " name="numero_chasis" value={formData.numero_chasis} onChange={handleChange} placeholder="JTDBU4DK4KJ123456" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Marca " name="marca" value={formData.marca} onChange={handleChange} placeholder="Toyota" required />
              <InputField label="Modelo " name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Corolla" required />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Año *
                </label>
                <input
                  type="number"
                  name="anio"
                  value={formData.anio}
                  onChange={handleChange}
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="No Recibido">No Recibido</option>
                  <option value="Recibido">Recibido</option>
                  <option value="Proceso">En Proceso</option>
                  <option value="Entregado">Entregado</option>
                </select>
              </div>
              <InputField label="Cliente ID " name="id_cliente" value={formData.id_cliente} onChange={handleChange} placeholder="ID del cliente" required />

            </div>
          </div>

          {/* Fechas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Fechas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Fecha de Recepción " type="date" name="fecha_esperada" value={formData.fecha_esperada} onChange={handleChange} />
              <InputField label="Fecha Esperada " type="date" name="fecha_recepcion" value={formData.fecha_recibido} onChange={handleChange} />
              <InputField label="Fecha de Entrega " type="date" name="fecha_entrega" value={formData.fecha_entrega} onChange={handleChange} />
            </div>
          </div>

          {/* Descripción de Trabajos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción de Trabajos *
            </label>
            <textarea
              name="descripcion_trabajos"
              value={formData.descripcion_trabajos}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Describe los trabajos a realizar en el vehículo..."
            />
          </div>

          {/* Botones */}
          <BotonesForm
            //onGuardar={handleGuardar}
            onCancel={onCancel}
          />

        </form>
      </div>
    </div>
  );
};

export default VehiculoForm;