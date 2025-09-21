import { usePresupuestosList } from '../../hooks/Presupuestos/usePresupuestosList';
import { Search, FileText, Calendar, User } from 'lucide-react';
import { EntidadNotFound } from '../Shared/EntidadNotFound';
import { FiltrosEntidad } from '../Shared/FiltrosEntidad';
import { BotonesTarjeta } from '../Shared/BotonesTarjeta';
import { HeaderEntidad } from '../Shared/HeaderEntidad';
import { TarjetaSpan } from '../Clientes/TarjetaSpan';
import { Cliente, Presupuesto } from '../../types';

interface PresupuestosListProps {
  onAddPresupuesto: () => void;
  onEditPresupuesto: (presupuesto: Presupuesto) => void;
  eliminarPresupuesto: (id: number) => void;
  presupuestos: Presupuesto[];
  clientes: Cliente[];
  error: string | null;
}


const PresupuestosList: React.FC<PresupuestosListProps> = ({ onAddPresupuesto, onEditPresupuesto }) => {
  const {
    filteredPresupuestos,
    searchTerm,
    setSearchTerm,
    filterMonth,
    setFilterMonth,
    getClienteNombre,
    eliminarPresupuesto,
    formatDate,
    formatCurrency,
    opcionesMeses
  } = usePresupuestosList();

  return (
    <div className="p-6">

      {/* Header */}
      <HeaderEntidad titulo="Presupuestos" textoGestion="los presupuestos del taller" onClick={onAddPresupuesto} textoBoton="Nuevo Presupuesto" />

      {/* Filtros */}
      <FiltrosEntidad
        buscadorIcon={Search}
        buscadorPlaceholder="Buscar por número de presupuesto..."
        buscadorValue={searchTerm}
        onBuscadorChange={(e) => setSearchTerm(e.target.value)}
        buscadorName="buscadorPresupuesto"
        buscadorId="buscadorPresupuesto"
        selectValue={filterMonth}
        onSelectChange={(e) => setFilterMonth(e.target.value)}
        selectOptions={opcionesMeses}
        selectName="estadoPresupuesto"
        selectId="estadoPresupuesto"
      />

      {/* Presupuestos Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredPresupuestos.map((presupuesto) => {

          return (
            <div key={presupuesto.idPresupuesto} className="bg-white rounded-lg shadow-sm border border-gray-400 p-6 hover:shadow-md 
                                                       hover:border-green-500 transform hover:-translate-y-1 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{presupuesto.idPresupuesto}</h3>
                  </div>
                </div>
                <BotonesTarjeta
                  onEdit={() => onEditPresupuesto(presupuesto)}
                  onDelete={() => eliminarPresupuesto(presupuesto.idPresupuesto)}
                />

              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Fecha: {formatDate(presupuesto.fecha)}</span>
                </div>

                <TarjetaSpan >
                  <span className="font-medium">Mano de obra Pintura: </span>
                  <span>{formatCurrency(presupuesto.manoDeObraPintura)}</span>
                </TarjetaSpan>
                <TarjetaSpan >
                  <span className="font-medium">Mano de obra Chapa: </span>
                  <span>{formatCurrency(presupuesto.manoDeObraChapa)}</span>
                </TarjetaSpan>
                <TarjetaSpan >
                  <span className="font-medium">Total Repuestos: </span>
                  <span>{formatCurrency(presupuesto.totalRepuestos)}</span>
                </TarjetaSpan>
                <TarjetaSpan >
                  <span className="font-medium">Total: </span>
                  <span>{formatCurrency(presupuesto.manoDeObraChapa + presupuesto.manoDeObraPintura + presupuesto.totalRepuestos)}</span>
                </TarjetaSpan>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <User className="w-4 h-4" />
                <span>Cliente: {getClienteNombre(presupuesto.idCliente)}</span>
              </div>
            </div>
          );
        })}
      </div>


      {filteredPresupuestos.length === 0 && (
        <EntidadNotFound
          icon={<FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />}
          titulo="presupuestos"
        />
      )}
    </div>
  );
};

export default PresupuestosList;