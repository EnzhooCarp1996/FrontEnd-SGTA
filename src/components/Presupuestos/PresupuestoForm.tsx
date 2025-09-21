import { usePresupuestoForm } from '../../hooks/Presupuestos/usePresupuestoForm';
import { Cliente, Presupuesto, PresupuestoData, Vehiculo } from "../../types";
import { SeccionUbicacion } from './SeccionUbicacion';
import { HeaderForm } from '../Shared/HeaderForm';
import { InputForm } from '../Shared/InputForm';
import { Eye, FileText } from 'lucide-react';
import VistaPrevia from './VistaPrevia';


const ubicaciones = [
  'PARTE DELANTERA',
  'PARTE TRASERA',
  'INTERIOR',
  'LADO DERECHO',
  'LADO IZQUIERDO',
  'MOTOR',
  'CHASIS',
  'TREN DELANTERO',
  'TREN TRASERO',
  'TRANSMISION',
  'DIRECCION',
];

const PresupuestoForm: React.FC<{
  presupuestos?: Presupuesto;
  onSave: (data: PresupuestoData) => void;
  onCancel: () => void;
  clientes: Cliente[];
  vehiculos: Vehiculo[];
}> = ({ presupuestos, vehiculos, clientes, onSave, onCancel }) => {
  const {
    formData,
    items,
    errors,
    mostrarVistaPrevia,
    handleChange,
    addItem,
    updateItem,
    removeItem,
    handleVistaPrevia,
    handleGuardar,
    handleCerrarModal
  } = usePresupuestoForm( vehiculos, clientes, presupuestos);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg border-2 border-black shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

          <HeaderForm
            icon={FileText}
            tituloNuevo="Nuevo Presupuesto"
            onCancel={onCancel}
          />

          <form className="p-6 space-y-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Rellenar Presupuesto
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><InputForm label="Fecha" type="date" name="fecha" value={formData.fecha} onChange={handleChange} required error={errors.fecha} /></div>
                <InputForm label="Póliza N°" name="poliza" value={formData.poliza} onChange={handleChange} required error={errors.poliza} />

                <div>
                  <label htmlFor="idCliente" className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
                  <select
                    id="idCliente"
                    name="idCliente"
                    value={formData.idCliente}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Seleccione</option>
                    {clientes.map(c => (
                      <option key={c.idCliente} value={c.idCliente}>
                        {c.tipoCliente === "Persona" ? `${c.nombre} ${c.apellido}` : c.razonSocial}
                      </option>
                    ))}
                  </select>
                  {errors.cliente && <p className="text-red-500 text-sm">{errors.cliente}</p>}
                </div>
                <InputForm label="Domicilio" name="domicilio" value={formData.domicilio} onChange={handleChange} placeholder="Avenida/Calle SiempreViva 123" required error={errors.domicilio} />
                
                <div>
                  <label htmlFor="idVehiculo" className="block text-sm font-medium text-gray-700 mb-2">Vehículo</label>
                  <select
                    id="idVehiculo"
                    name="idVehiculo"
                    value={formData.idVehiculo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Seleccione</option>
                    {vehiculos
                      .filter(v => v.idCliente === formData.idCliente)
                      .map(v => (
                        <option key={v.idVehiculo} value={v.idVehiculo}>
                          {`${v.marca} ${v.modelo}`}
                        </option>
                      ))}
                  </select>
                  {errors.vehiculo && <p className="text-red-500 text-sm">{errors.vehiculo}</p>}
                </div>

                <InputForm label="Patente" name="patente" value={formData.patente} onChange={handleChange} placeholder="ABC123" readOnly required error={errors.patente} />
                <div><InputForm label="Siniestro N°" name="siniestro" value={formData.siniestro} onChange={handleChange} /></div>
                <InputForm label="M.O. CHAPA" type="number" name="chapa" value={formData.chapa} onChange={handleChange} step="0.01" required error={errors.chapa} />
                <InputForm label="M.O. PINTURA" type="number" name="pintura" value={formData.pintura} onChange={handleChange} step="0.01" required error={errors.pintura} />
                <div><InputForm label="M.O. ELECTRICIDAD" type="number" name="electricidad" value={formData.electricidad} onChange={handleChange} step="0.01" /></div>
                <div><InputForm label="M.O. MECANICA" type="number" name="mecanica" value={formData.mecanica} onChange={handleChange} step="0.01" /></div>
                <InputForm label="Firma" name="firmaResponsable" value={formData.firmaResponsable} onChange={handleChange} required error={errors.firmaResponsable} />
              </div>

              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-1">Reparaciones</h3>
            </div>

            {ubicaciones.map(ubicacion => (
              <SeccionUbicacion
                key={ubicacion}
                ubicacion={ubicacion}
                items={items}
                addItem={addItem}
                updateItem={updateItem}
                removeItem={removeItem}
              />
            ))}

            <div>
              <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-2">Observaciones</label>
              <textarea
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe las observaciones extras..."
              />
            </div>

            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <button type="button" onClick={handleVistaPrevia} className="flex-1 bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Eye className="w-5 h-5" />
                <span>Vista Previa</span>
              </button>
              <button type="button" onClick={onCancel} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      {mostrarVistaPrevia && (
        <VistaPrevia
          presupuesto={formData}
          items={items}
          onClose={handleCerrarModal}
          onSave={() => handleGuardar(onSave)}
        />
      )}
    </>
  );
};

export default PresupuestoForm;
