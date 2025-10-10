import { SelectForm } from '../Clientes/ClienteFormComponents/SelectForm';
import { useVehiculoForm } from '../../hooks/Vehiculos/useVehiculoForm';
import { formatearFecha } from '../../helpers/utilsVehiculos';
import { FormGeneral } from '../Shared/FormGeneral';
import { BotonesForm } from '../Shared/BotonesForm';
import { Vehiculo, Cliente } from '../../types';
import { LabelForm } from '../Shared/LabelForm';
import { FormField } from '../Shared/FormField';
import { Car } from 'lucide-react';


interface VehiculoFormProps {
  vehiculo?: Vehiculo;
  clientes: Cliente[];
  onSave: (vehiculo: Partial<Vehiculo>) => void;
  onCancel: () => void;
}

export const VehiculoForm: React.FC<VehiculoFormProps> = ({ vehiculo, clientes, onSave, onCancel }) => {
  const { formData, errors, marcas, modelos, handleChange, handleSubmit } = useVehiculoForm(vehiculo, onSave);

  return (
    <FormGeneral icon={Car} titulo="Vehículo" condicion={!!vehiculo} onCancel={onCancel} maxWidth="max-w-3xl" >

      {/* Información del Vehículo */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
          Información del Vehículo (obligatorio: <span className="text-red-500">*</span>)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Patente " name="patente" value={formData.patente} onChange={handleChange} placeholder="ABC123" required error={errors.patente} />
          <FormField label="Número de Chasis " name="nroDeChasis" value={formData.nroDeChasis} onChange={handleChange} placeholder="JTDBU4DK4KJ123456" required error={errors.nroDeChasis} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Marca */}
          <div>
            <LabelForm htmlFor={"marca"} label={"Marca"} required />
            <select
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Seleccione</option>
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
            <LabelForm htmlFor={"modelo"} label={"Modelo"} required />
            <select
              id="modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Seleccione</option>
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
              <LabelForm htmlFor={"anio"} label={"Año"} required />
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
          <SelectForm
            id="estado"
            name="estado"
            label="Estado"
            value={formData.estado}
            onChange={handleChange}
            options={[
              { value: "No Recibido", label: "No Recibido" },
              { value: "Recibido", label: "Recibido" },
              { value: "Proceso", label: "En Proceso" },
              { value: "Entregado", label: "Entregado" },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-1">
            <SelectForm
              id="idCliente"
              name="idCliente"
              label="Cliente"
              value={String(formData.idCliente ?? "")}
              onChange={handleChange}
              required
              error={errors.idCliente}
              options={clientes.map((c) => ({
                value: c.idCliente,
                label:
                  c.tipoCliente === "Persona"
                    ? `${c.nombre} ${c.apellido}`
                    : c.razonSocial || "Sin nombre",
              }))}
            />
          </div>
        </div>
      </div>

      {/* Fechas */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
          Fechas
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <FormField label="Fecha de Recepción " type="date" name="fechaRecibido" value={formatearFecha(formData.fechaRecibido)} onChange={handleChange} error={errors.fechaRecibido} />
          </div>
          <div>
            <FormField label="Fecha Esperada " type="date" name="fechaEsperada" value={formatearFecha(formData.fechaEsperada)} onChange={handleChange} error={errors.fechaEsperada} />
          </div>
          <div>
            <FormField label="Fecha de Entrega " type="date" name="fechaEntrega" value={formatearFecha(formData.fechaEntrega)} onChange={handleChange} error={errors.fechaEntrega} />
          </div>
        </div>
      </div>

      {/* Descripción de Trabajos */}
      <div>
        <LabelForm htmlFor={"descripcionTrabajos"} label={"Descripción de Trabajos"} />
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
    </FormGeneral>
  );
};
