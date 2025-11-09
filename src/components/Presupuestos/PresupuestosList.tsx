import { usePresupuestosList } from '../../hooks/Presupuestos/usePresupuestosList';
import { opcionesMeses } from '../../helpers/utilsPresupuestos';
import { EntidadNotFound } from '../Shared/EntidadNotFound';
import { FiltrosEntidad } from '../Shared/FiltrosEntidad';
import { HeaderEntidad } from '../Shared/HeaderEntidad';
import { usePermisos } from '../../hooks/usePermisos';
import { PresupuestoCard } from './PresupuestoCard';
import { Search, FileText } from 'lucide-react';
import { PresupuestoData } from '../../types';

interface PresupuestosListProps {
  onAddPresupuesto: () => void;
  onEditPresupuesto: (presupuesto: PresupuestoData) => void;
}

export const PresupuestosList: React.FC<PresupuestosListProps> = ({ onAddPresupuesto, onEditPresupuesto }) => {
  const { filteredPresupuestos, searchTerm, setSearchTerm, filterMonth, setFilterMonth, eliminarPresupuesto } = usePresupuestosList();
  const { puedeModificar } = usePermisos();

  return (
    <>
      {/* Header */}
      <HeaderEntidad titulo="Presupuestos" textoGestion="los presupuestos del taller" onClick={onAddPresupuesto} textoBoton="Presupuesto" />

      {/* Filtros */}
      <FiltrosEntidad
        buscadorIcon={Search}
        buscadorPlaceholder="número de presupuesto"
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
        {filteredPresupuestos.map((presupuesto, index) => (
          <PresupuestoCard
            key={presupuesto._id + "-" + index}
            presupuesto={presupuesto}
            onEdit={puedeModificar ? onEditPresupuesto : () => { }}
            onDelete={puedeModificar ? eliminarPresupuesto : () => { }}
          />
        ))}
      </div>

      {filteredPresupuestos.length === 0 && (
        <EntidadNotFound icon={<FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />} titulo="presupuestos" />
      )}
    </>
  );
};

