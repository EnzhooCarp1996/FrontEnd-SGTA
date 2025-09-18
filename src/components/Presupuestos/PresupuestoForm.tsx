import React, { useState, useEffect } from 'react';
import { Eye, FileText } from 'lucide-react';
import VistaPrevia from './VistaPrevia';
import { TablaRow } from "./TablaRow";
import { HeaderForm } from '../Shared/HeaderForm';
import { InputForm } from '../Shared/InputForm';

interface PresupuestoItem {
  id: string;
  descripcion: string;
  ubicacion: string;
  a: string;
  b: string;
  observaciones: string;
  importe: number;
}
interface PresupuestoData {
  id_presupuesto: string;
  fecha: string;
  cliente: string;
  domicilio: string;
  poliza: string;
  vehiculo: string;
  patente: string;
  siniestro: string;
  chapa: number;
  pintura: number;
  mecanica: number;
  electricidad: number;
  repuestos: number;
  lugar_fecha: string;
  firma_cliente: string;
  firma_responsable: string;
  observaciones: string;
  rueda_auxilio: string;
  encendedor: string;
  cricket: string;
  herramientas: string;
  total: number;
  items: PresupuestoItem[];
}


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
  onSave: (data: PresupuestoData) => void;
  onCancel: () => void;
}> = ({ onSave, onCancel }) => {
  const [items, setItems] = useState<PresupuestoItem[]>([]);
  const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(false);
  const [formData, setFormData] = useState({
    id_presupuesto: '',
    fecha: new Date().toISOString().split('T')[0],
    cliente: '',
    domicilio: '',
    poliza: '',
    vehiculo: '',
    patente: '',
    siniestro: '',
    chapa: 0.00,
    pintura: 0.00,
    mecanica: 0.00,
    electricidad: 0.00,
    repuestos: 0.00,
    lugar_fecha: '',
    firma_cliente: '',
    firma_responsable: '',
    observaciones: '',
    rueda_auxilio: '',
    encendedor: '',
    cricket: '',
    herramientas: '',
    total: 0
  });

  useEffect(() => {
    document.body.style.overflow = mostrarVistaPrevia ? 'hidden' : '';
  }, [mostrarVistaPrevia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Validar número positivo con decimales (incluye vacío para permitir borrar)
    if (type === 'number') {
      if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value === '' ? '' : parseFloat(value) || 0,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addItem = (ubicacion: string) => {
    const newItem: PresupuestoItem = {
      id: Date.now().toString(),
      descripcion: '',
      ubicacion,
      a: '',
      b: '',
      observaciones: '',
      importe: 0.00,
    };
    setItems((prev) => [...prev, newItem]);
  };

  function updateItem(
    id: string,
    field: keyof PresupuestoItem,
    value: string | number,
    type?: string
  ): void {
    if (type === 'number') {
      const val = typeof value === 'string' ? value : value.toString();

      if (val === '' || (/^\d*\.?\d*$/.test(val) && parseFloat(val) >= 0)) {
        const parsed = val === '' ? 0 : parseFloat(val) || 0;

        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, [field]: parsed } : item
          )
        );
      }

      return;
    }

    // lógica para campos no numéricos
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) return item;

        const updatedItem = { ...item, [field]: value };

        if (field === 'a' && value === 'X') updatedItem.b = '--';
        if (field === 'b' && value === 'X') updatedItem.a = '--';

        return updatedItem;
      })
    );
  }
  const [displayValues, setDisplayValues] = useState<Record<string, string>>({});



  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleVistaPrevia = () => {
    setFormData((prev) => ({
      ...prev,
      id_presupuesto: `001-${Math.floor(Math.random() * 99999999 + 1).toString().padStart(8, '0')}`,
    }));
    setMostrarVistaPrevia(true);
  };

  const handleGuardar = () => {
    onSave({ ...formData, items });
    setMostrarVistaPrevia(false);
  };

  const handleCerrarModal = () => setMostrarVistaPrevia(false);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg border-2 border-black shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

          <HeaderForm
            icon={FileText}
            tituloNuevo="Nuevo Presupuesto"
            onCancel={onCancel}
          />

          <form onSubmit={handleGuardar} className="p-6 space-y-2">
            {/* Datos cliente */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Rellenar Presupuesto
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputForm label="Fecha " type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
                <InputForm label="Póliza N° " name="poliza" value={formData.poliza} onChange={handleChange} required />
                <InputForm label="Cliente " name="cliente" value={formData.cliente} onChange={handleChange} placeholder="Cesar Diaz" required />
                <InputForm label="Domicilio " name="domicilio" value={formData.domicilio} onChange={handleChange} placeholder="Avenida/Calle SiempreViva 123" required />
                <InputForm label="Vehículo " name="vehiculo" value={formData.vehiculo} onChange={handleChange} placeholder="Toyota Corolla" required />
                <InputForm label="Patente " name="patente" value={formData.patente} onChange={handleChange} placeholder="ABC123" required />
                <InputForm label="Siniestro N° " name="siniestro" value={formData.siniestro} onChange={handleChange} />
                <InputForm label="M.O. CHAPA " type="number" name="chapa" value={formData.chapa} onChange={handleChange} step="0.01" required />
                <InputForm label="M.O. PINTURA " type="number" name="pintura" value={formData.pintura} onChange={handleChange} step="0.01" required />
                <InputForm label="M.O. ELECTRICIDAD " type="number" name="electricidad" value={formData.electricidad} onChange={handleChange} step="0.01" />
                <InputForm label="M.O. MECANICA " type="number" name="mecanica" value={formData.mecanica} onChange={handleChange} step="0.01" />
                <InputForm label="Firma " name="firma_responsable" value={formData.firma_responsable} onChange={handleChange} required />

              </div>

              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-1">
                Reparaciones
              </h3>

            </div>
            {/* Tablas por sección */}
            {ubicaciones.map((ubicacion) => {
              const itemsPorUbicacion = items.filter((item) => item.ubicacion === ubicacion);

              return (

                <div key={ubicacion} className="border-none p-0 rounded-md mt-2 mb-6">

                  <div className="flex justify-between items-center mb-1">
                    <h2 className="text-lg font-medium ">{ubicacion}</h2>
                    <button
                      type="button"
                      onClick={() => addItem(ubicacion)}
                      className=" bg-green-600 hover:bg-green-800 text-white px-3 py-1 rounded"
                    >
                      Agregar Parte
                    </button>
                  </div>

                  {itemsPorUbicacion.length > 0 && (
                    <table className="w-full text-sm border-collapse border border-gray-950">
                      <thead>
                        <tr className="bg-gray-300">
                          <th className="border border-gray-600 px-2 py-1">Parte</th>
                          <th className="border border-gray-600 px-2 py-1">A</th>
                          <th className="border border-gray-600 px-2 py-1">B</th>
                          <th className="border border-gray-600 px-2 py-1">Observaciones</th>
                          <th className="border border-gray-600 px-2 py-1">Importe($)</th>
                          <th className="border border-gray-600 px-2 py-1"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemsPorUbicacion.map((item) => (
                          <TablaRow
                            key={item.id}
                            item={item}
                            items={itemsPorUbicacion}
                            displayValues={displayValues}
                            setDisplayValues={setDisplayValues}
                            updateItem={updateItem}
                            removeItem={removeItem}
                          />
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              );
            })}

            {/* Observaciones */}
            <div>
              <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-2">
                Observaciones
              </label>
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

            {/* Botones de acción */}
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                onClick={handleVistaPrevia}
                className="flex-1 bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Eye className="w-5 h-5" />
                <span>Vista Previa</span>
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
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
          onSave={handleGuardar}
        />
      )}
    </>
  );
};

export default PresupuestoForm;
