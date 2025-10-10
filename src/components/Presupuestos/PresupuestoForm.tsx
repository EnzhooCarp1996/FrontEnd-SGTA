import { usePresupuestoForm } from '../../hooks/Presupuestos/usePresupuestoForm';
import { ubicacionesPartes } from '../../constants/ubicacionesPresupuesto';
import { SeccionUbicacion } from './FormComponents/SeccionUbicacion';
import { Cliente, PresupuestoData, Vehiculo } from "../../types";
import { FormGeneral } from '../Shared/FormGeneral';
import { FormField } from '../Shared/FormField';
import { LabelForm } from '../Shared/LabelForm';
import { Eye, FileText } from 'lucide-react';
import VistaPrevia from './VistaPrevia';

interface PresupuestoFormProps {
  presupuesto?: PresupuestoData;
  onSave: (presupuesto: Partial<PresupuestoData>) => void;
  onCancel: () => void;
  clientes: Cliente[];
  vehiculos: Vehiculo[];
}

export const PresupuestoForm: React.FC<PresupuestoFormProps> = ({ presupuesto, vehiculos, clientes, onSave, onCancel }) => {

  const {
    formData,
    errors,
    mostrarVistaPrevia,
    estructuraPartes,
    handleChange,
    addItem,
    updateItem,
    removeItem,
    handleValidarYMostrarVistaPrevia,
    handleSubmit,
    handleCerrarModal
  } = usePresupuestoForm(vehiculos, clientes, presupuesto, onSave);

  return (
    <>
      <FormGeneral icon={FileText} titulo="Presupuesto" condicion={!!presupuesto} onCancel={onCancel} >

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Rellenar Presupuesto
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <LabelForm htmlFor={"idCliente"} label={"Cliente"} />
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
            <FormField label="Domicilio" name="domicilio" value={formData.domicilio} onChange={handleChange} placeholder="Avenida/Calle SiempreViva 123" required error={errors.domicilio} />
            <FormField label="Póliza N°" name="poliza" value={formData.poliza} onChange={handleChange} required error={errors.poliza} />
            <div>
              <LabelForm htmlFor={"idVehiculo"} label={"Vehículo"} />
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

            <FormField label="Patente" name="patente" value={formData.patente} onChange={handleChange} placeholder="ABC123" readOnly required error={errors.patente} />
            <div><FormField label="Siniestro N°" name="siniestro" value={formData.siniestro} onChange={handleChange} /></div>
            <FormField label="M.O. CHAPA" type="number" name="manoDeObraChapa" value={formData.manoDeObraChapa} onChange={handleChange} step="0.01" required error={errors.chapa} />
            <FormField label="M.O. PINTURA" type="number" name="manoDeObraPintura" value={formData.manoDeObraPintura} onChange={handleChange} step="0.01" required error={errors.pintura} />
            <div><FormField label="M.O. ELECTRICIDAD" type="number" name="electricidad" value={formData.electricidad} onChange={handleChange} step="0.01" /></div>
            <div><FormField label="M.O. MECANICA" type="number" name="mecanica" value={formData.mecanica} onChange={handleChange} step="0.01" /></div>
            <div><FormField label="Fecha" type="date" name="fecha" value={formData.fecha} onChange={handleChange} required error={errors.fecha} /></div>
            <FormField label="Firma" name="firmaResponsable" value={formData.firmaResponsable} onChange={handleChange} />
          </div>

          <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-1">Reparaciones</h3>
        </div>

        {ubicacionesPartes.map(ubicacion => (
          <SeccionUbicacion
            key={ubicacion}
            ubicacion={ubicacion}
            items={formData.items}
            estructuraPartes={estructuraPartes}
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
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Describe las observaciones extras..."
          />
        </div>

        <div className="flex space-x-4 pt-6 border-t border-gray-200">
          <button type="button" onClick={handleValidarYMostrarVistaPrevia} className="flex-1 bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <Eye className="w-5 h-5" />
            <span>Vista Previa</span>
          </button>
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors">
            Cancelar
          </button>
        </div>

      </FormGeneral>

      {mostrarVistaPrevia && (
        <VistaPrevia
          presupuesto={formData}
          onClose={handleCerrarModal}
          onSave={handleSubmit}
        />
      )}
    </>
  );
};


