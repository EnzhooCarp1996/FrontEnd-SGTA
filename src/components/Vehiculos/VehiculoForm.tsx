import { useVehiculoForm } from '../../hooks/Vehiculos/useVehiculoForm';
import { BotonesForm } from '../Shared/BotonesForm';
import { Vehiculo, Cliente } from '../../types';
import { InputForm } from '../Shared/InputForm';
import { Car } from 'lucide-react';
import { FormGeneral } from '../Shared/FormGeneral';


interface VehiculoFormProps {
  vehiculo?: Vehiculo;
  clientes: Cliente[];
  onSave: (vehiculo: Partial<Vehiculo>) => void;
  onCancel: () => void;
}

const VehiculoForm: React.FC<VehiculoFormProps> = ({ vehiculo, clientes, onSave, onCancel }) => {
  const {
    formData,
    errors,
    marcas,
    modelos,
    handleChange,
    handleSubmit,
    formatearFecha
  } = useVehiculoForm(vehiculo, onSave);

  return (

        <FormGeneral
          icon={Car}
          titulo="Vehículo"
          condicion={!!vehiculo}
          onCancel={onCancel}
          onSubmit={handleSubmit}
          maxWidth="max-w-3xl"
        > 


            {/* Información del Vehículo */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Información del Vehículo (obligatorio: <span className="text-red-500">*</span>)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputForm label="Patente " name="patente" value={formData.patente} onChange={handleChange} placeholder="ABC123" required error={errors.patente} />
                <InputForm label="Número de Chasis " name="nroDeChasis" value={formData.nroDeChasis} onChange={handleChange} placeholder="JTDBU4DK4KJ123456" required error={errors.nroDeChasis} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Marca */}
                <div>
                  <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-2">Marca <span className="text-red-500">*</span></label>
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
                  <label htmlFor="modelo" className="block text-sm font-medium text-gray-700 mb-2">Modelo <span className="text-red-500">*</span></label>
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
                    <label htmlFor="anio" className="block text-sm font-medium text-gray-700 mb-2">
                      Año <span className="text-red-500">*</span>
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
                    Estado
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
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <label htmlFor="idCliente" className="block text-sm font-medium text-gray-700 mb-2">
                    Cliente
                  </label>
                  <select
                    id="idCliente"
                    name="idCliente"
                    value={formData.idCliente}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Seleccione</option>
                    {clientes.map((c) => (
                      <option key={c.idCliente} value={c.idCliente}>
                        {c.tipoCliente === "Persona" ? `${c.nombre} ${c.apellido}` : `${c.razonSocial}`}
                      </option>
                    ))}
                  </select>
                  {errors.idCliente && <p className="text-red-500 text-sm">{errors.idCliente}</p>}
                </div>


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
                Descripción de Trabajos
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


    </FormGeneral>
  );
};

export default VehiculoForm;